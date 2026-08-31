import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { CheckoutHeader } from '../components/checkout/CheckoutHeader';
import { CheckoutProgress } from '../components/checkout/CheckoutProgress';
import { ContactForm } from '../components/checkout/ContactForm';
import { AddressForm } from '../components/checkout/AddressForm';
import { SavedAddressCard } from '../components/checkout/SavedAddressCard';
import { DeliveryMethods } from '../components/checkout/DeliveryMethods';
import { PaymentMethods } from '../components/checkout/PaymentMethods';
import { OrderReviewList } from '../components/checkout/OrderReviewList';
import { CheckoutSummary } from '../components/checkout/CheckoutSummary';
import {
  calculateSubtotal,
  calculateDiscount,
  calculateTax,
  calculateGrandTotal,
  FREE_SHIPPING_THRESHOLD,
} from '../utils/cartCalculations';
import { AlertCircle } from 'lucide-react';

export const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart, appliedCoupon, showToast } = useShop();

  // 1. Guard against empty cart
  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  // 2. Stepper Progress State
  const [currentStep, setCurrentStep] = useState('information');

  // 3. Contact Form State
  const [contactData, setContactData] = useState({
    email: '',
    phone: '',
    newsletterOptIn: true,
  });
  const [contactErrors, setContactErrors] = useState({});

  // 4. Saved Address & Address Form State
  const [savedAddress, setSavedAddress] = useState(() => {
    try {
      const saved = localStorage.getItem('elan_saved_address');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isUsingSavedAddress, setIsUsingSavedAddress] = useState(() => {
    try {
      return !!localStorage.getItem('elan_saved_address');
    } catch {
      return false;
    }
  });

  const [addressData, setAddressData] = useState(() => {
    if (savedAddress) return savedAddress;
    return {
      firstName: '',
      lastName: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pinCode: '',
      country: 'India',
    };
  });
  const [addressErrors, setAddressErrors] = useState({});
  const [saveAddressToStorage, setSaveAddressToStorage] = useState(true);

  // 5. Delivery Method State
  const subtotal = calculateSubtotal(cart);
  const isFreeStandard = subtotal >= FREE_SHIPPING_THRESHOLD;
  const [deliveryMethod, setDeliveryMethod] = useState({
    id: 'standard',
    name: 'Standard Insured Delivery',
    estimate: '3–5 Business Days',
    price: isFreeStandard ? 0 : 99,
  });

  // Keep delivery method price synchronized with subtotal changes
  useEffect(() => {
    if (deliveryMethod.id === 'standard') {
      setDeliveryMethod((prev) => ({
        ...prev,
        price: subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 99,
      }));
    }
  }, [subtotal]);

  // 6. Payment Method State
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardData, setCardData] = useState({
    cardNumber: '',
    nameOnCard: '',
    expiry: '',
    cvv: '',
  });
  const [cardErrors, setCardErrors] = useState({});
  const [upiId, setUPIId] = useState('');
  const [isUPIVerified, setIsUPIVerified] = useState(false);
  const [upiError, setUPIError] = useState('');

  // 7. Order Processing & Error State
  const [isProcessing, setIsProcessing] = useState(false);
  const [globalError, setGlobalError] = useState('');

  // Calculations for step completion
  const isContactComplete = !!(contactData.email && contactData.phone && !contactErrors.email && !contactErrors.phone);
  const isAddressComplete = !!(isUsingSavedAddress || (addressData.firstName && addressData.lastName && addressData.addressLine1 && addressData.city && addressData.state && addressData.pinCode));
  const isPaymentComplete = paymentMethod === 'cod' || (paymentMethod === 'upi' && isUPIVerified) || (paymentMethod === 'card' && cardData.cardNumber && cardData.expiry && cardData.cvv);

  const completedSteps = [];
  if (isContactComplete) completedSteps.push('information');
  if (isAddressComplete) completedSteps.push('shipping');
  if (isPaymentComplete) completedSteps.push('payment');

  // Price calculations
  const discount = calculateDiscount(subtotal, appliedCoupon);
  const shippingFee = deliveryMethod.price;
  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = calculateTax(taxableAmount);
  const grandTotal = calculateGrandTotal(subtotal, discount, shippingFee, tax);

  // Validation Helpers
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email?.trim() || '');
  const validatePhone = (phone) => /^[6-9]\d{9}$/.test(phone?.trim() || '');
  const validatePIN = (pin) => /^\d{6}$/.test(pin?.trim() || '');

  const handleContactBlur = (field) => {
    if (field === 'email') {
      if (!contactData.email.trim()) {
        setContactErrors((prev) => ({ ...prev, email: 'Email address is required.' }));
      } else if (!validateEmail(contactData.email)) {
        setContactErrors((prev) => ({ ...prev, email: 'Enter a valid email address.' }));
      } else {
        setContactErrors((prev) => ({ ...prev, email: '' }));
      }
    }
    if (field === 'phone') {
      if (!contactData.phone.trim()) {
        setContactErrors((prev) => ({ ...prev, phone: 'Mobile number is required.' }));
      } else if (!validatePhone(contactData.phone)) {
        setContactErrors((prev) => ({ ...prev, phone: 'Enter a valid 10-digit Indian phone number.' }));
      } else {
        setContactErrors((prev) => ({ ...prev, phone: '' }));
      }
    }
  };

  const handleAddressBlur = (field) => {
    const val = addressData[field] || '';
    if (!val.trim()) {
      setAddressErrors((prev) => ({
        ...prev,
        [field]: `${field.replace(/([A-Z])/g, ' $1').toLowerCase()} is required.`,
      }));
    } else if (field === 'pinCode' && !validatePIN(val)) {
      setAddressErrors((prev) => ({
        ...prev,
        pinCode: 'Enter a valid 6-digit Indian PIN code.',
      }));
    } else {
      setAddressErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleCardBlur = (field) => {
    const val = cardData[field] || '';
    if (field === 'cardNumber') {
      const raw = val.replace(/\s/g, '');
      if (raw.length < 16) {
        setCardErrors((prev) => ({ ...prev, cardNumber: 'Enter a valid 16-digit card number.' }));
      } else {
        setCardErrors((prev) => ({ ...prev, cardNumber: '' }));
      }
    } else if (field === 'nameOnCard') {
      if (!val.trim()) {
        setCardErrors((prev) => ({ ...prev, nameOnCard: 'Name on card is required.' }));
      } else {
        setCardErrors((prev) => ({ ...prev, nameOnCard: '' }));
      }
    } else if (field === 'expiry') {
      if (!/^\d{2}\/\d{2}$/.test(val)) {
        setCardErrors((prev) => ({ ...prev, expiry: 'Valid MM/YY required.' }));
      } else {
        setCardErrors((prev) => ({ ...prev, expiry: '' }));
      }
    } else if (field === 'cvv') {
      if (val.length < 3) {
        setCardErrors((prev) => ({ ...prev, cvv: 'Enter 3 or 4 digit CVV.' }));
      } else {
        setCardErrors((prev) => ({ ...prev, cvv: '' }));
      }
    }
  };

  const validateAll = () => {
    let isValid = true;
    const newContactErrors = {};
    const newAddressErrors = {};
    const newCardErrors = {};

    // 1. Validate Contact
    if (!contactData.email.trim() || !validateEmail(contactData.email)) {
      newContactErrors.email = 'Enter a valid email address.';
      isValid = false;
    }
    if (!contactData.phone.trim() || !validatePhone(contactData.phone)) {
      newContactErrors.phone = 'Enter a valid 10-digit Indian phone number.';
      isValid = false;
    }

    // 2. Validate Address
    if (!isUsingSavedAddress) {
      if (!addressData.firstName.trim()) { newAddressErrors.firstName = 'First name is required.'; isValid = false; }
      if (!addressData.lastName.trim()) { newAddressErrors.lastName = 'Last name is required.'; isValid = false; }
      if (!addressData.addressLine1.trim()) { newAddressErrors.addressLine1 = 'Address line 1 is required.'; isValid = false; }
      if (!addressData.city.trim()) { newAddressErrors.city = 'City is required.'; isValid = false; }
      if (!addressData.state.trim()) { newAddressErrors.state = 'State is required.'; isValid = false; }
      if (!addressData.pinCode.trim() || !validatePIN(addressData.pinCode)) {
        newAddressErrors.pinCode = 'Valid 6-digit PIN code required.';
        isValid = false;
      }
    }

    // 3. Validate Payment
    if (paymentMethod === 'card') {
      const rawCard = cardData.cardNumber.replace(/\s/g, '');
      if (rawCard.length < 16) { newCardErrors.cardNumber = 'Valid 16-digit card required.'; isValid = false; }
      if (!cardData.nameOnCard.trim()) { newCardErrors.nameOnCard = 'Name on card required.'; isValid = false; }
      if (!/^\d{2}\/\d{2}$/.test(cardData.expiry)) { newCardErrors.expiry = 'Valid MM/YY required.'; isValid = false; }
      if (cardData.cvv.length < 3) { newCardErrors.cvv = 'Valid CVV required.'; isValid = false; }
    } else if (paymentMethod === 'upi') {
      if (!upiId.trim() || !upiId.includes('@')) {
        setUPIError('Enter a valid UPI ID before placing order.');
        isValid = false;
      }
    }

    setContactErrors(newContactErrors);
    setAddressErrors(newAddressErrors);
    setCardErrors(newCardErrors);

    return isValid;
  };

  const handlePlaceOrder = () => {
    setGlobalError('');

    if (!validateAll()) {
      setGlobalError('Please resolve the highlighted issues in the form before placing order.');
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    setIsProcessing(true);

    // Simulate order placement
    setTimeout(() => {
      try {
        const randomNum = Math.floor(100000 + Math.random() * 900000);
        const orderNumber = `ORD-2026-${randomNum}`;
        const orderId = `order-${Date.now()}`;

        const activeAddress = isUsingSavedAddress && savedAddress
          ? savedAddress
          : { ...addressData, phone: contactData.phone };

        const newOrder = {
          id: orderId,
          orderNumber,
          createdAt: new Date().toISOString(),
          customer: contactData,
          shippingAddress: activeAddress,
          deliveryMethod,
          paymentMethod,
          items: [...cart],
          subtotal,
          discount,
          shipping: shippingFee,
          tax,
          total: grandTotal,
          couponCode: appliedCoupon?.code,
          status: 'Order Confirmed',
        };

        // 1. Save order to localStorage history (array of orders)
        const savedOrdersStr = localStorage.getItem('elan_orders');
        const existingOrders = savedOrdersStr ? JSON.parse(savedOrdersStr) : [];
        localStorage.setItem('elan_orders', JSON.stringify([newOrder, ...existingOrders]));

        // 2. Save address if requested
        if (saveAddressToStorage && !isUsingSavedAddress) {
          localStorage.setItem('elan_saved_address', JSON.stringify(activeAddress));
        }

        // 3. Clear cart
        clearCart();
        setIsProcessing(false);

        // 4. Navigate to success confirmation page
        navigate(`/order-success/${orderNumber}`);
      } catch (err) {
        setIsProcessing(false);
        setGlobalError('Something went wrong while processing your order. Please try again.');
      }
    }, 2000);
  };

  if (cart.length === 0) return null;

  return (
    <main className="w-full bg-luxury-black text-luxury-cream min-h-screen pb-12">
      {/* 1. Distraction-Free Minimal Checkout Header */}
      <CheckoutHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* 2. Responsive 4-Step Progress Indicator */}
        <CheckoutProgress
          currentStep={currentStep}
          completedSteps={completedSteps}
          onStepClick={(step) => setCurrentStep(step)}
        />

        {/* Global Error Banner */}
        {globalError && (
          <div className="p-4 bg-rose-950/70 border border-rose-500/50 text-rose-200 text-xs flex items-center justify-between gap-3 mb-8 animate-fade-in">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>{globalError}</span>
            </div>
            <button
              onClick={() => setGlobalError('')}
              className="text-luxury-muted hover:text-white uppercase tracking-wider text-[10px]"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* 2 Column Layout: Forms on Left, Sticky Summary on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Sequential Form Steps (7-8 Cols) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8">
            {/* Step 1: Contact Information */}
            <ContactForm
              data={contactData}
              errors={contactErrors}
              onChange={(field, val) => {
                setContactData((prev) => ({ ...prev, [field]: val }));
                if (contactErrors[field]) setContactErrors((prev) => ({ ...prev, [field]: '' }));
              }}
              onBlur={handleContactBlur}
            />

            {/* Step 2: Shipping Address & Saved Address Card */}
            <div className="space-y-4">
              {savedAddress && isUsingSavedAddress ? (
                <SavedAddressCard
                  savedAddress={savedAddress}
                  isSelected={isUsingSavedAddress}
                  onSelect={() => setIsUsingSavedAddress(true)}
                  onEdit={() => setIsUsingSavedAddress(false)}
                  onDelete={() => {
                    localStorage.removeItem('elan_saved_address');
                    setSavedAddress(null);
                    setIsUsingSavedAddress(false);
                    showToast('Saved address removed.', 'info');
                  }}
                  onUseNewAddress={() => setIsUsingSavedAddress(false)}
                />
              ) : (
                <AddressForm
                  data={addressData}
                  errors={addressErrors}
                  saveAddress={saveAddressToStorage}
                  onSaveAddressChange={setSaveAddressToStorage}
                  onChange={(field, val) => {
                    setAddressData((prev) => ({ ...prev, [field]: val }));
                    if (addressErrors[field]) setAddressErrors((prev) => ({ ...prev, [field]: '' }));
                  }}
                  onBlur={handleAddressBlur}
                />
              )}
            </div>

            {/* Step 3: Delivery Method */}
            <DeliveryMethods
              selectedMethod={deliveryMethod}
              subtotal={subtotal}
              onSelect={(method) => setDeliveryMethod(method)}
            />

            {/* Step 4: Payment Method */}
            <PaymentMethods
              selectedMethod={paymentMethod}
              onSelectMethod={(method) => setPaymentMethod(method)}
              cardData={cardData}
              cardErrors={cardErrors}
              onCardChange={(field, val) => {
                setCardData((prev) => ({ ...prev, [field]: val }));
                if (cardErrors[field]) setCardErrors((prev) => ({ ...prev, [field]: '' }));
              }}
              onCardBlur={handleCardBlur}
              upiId={upiId}
              onUPIChange={(val) => {
                setUPIId(val);
                if (upiError) setUPIError('');
              }}
              isUPIVerified={isUPIVerified}
              onUPIVerifyChange={setIsUPIVerified}
              upiError={upiError}
            />

            {/* Step 5: Order Review List */}
            <OrderReviewList items={cart} />
          </div>

          {/* Right Column: Sticky Summary & Place Order CTA (4-5 Cols) */}
          <div className="lg:col-span-5 xl:col-span-4">
            <CheckoutSummary
              subtotal={subtotal}
              discount={discount}
              deliveryMethod={deliveryMethod}
              tax={tax}
              grandTotal={grandTotal}
              appliedCoupon={appliedCoupon}
              isProcessing={isProcessing}
              onPlaceOrder={handlePlaceOrder}
            />
          </div>
        </div>
      </div>
    </main>
  );
};
