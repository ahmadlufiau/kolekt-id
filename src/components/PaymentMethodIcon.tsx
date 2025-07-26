import React from 'react';
import { CreditCard, Smartphone, QrCode } from 'lucide-react';
import { PaymentMethod } from '../types';

interface PaymentMethodIconProps {
  payment: PaymentMethod;
  className?: string;
}

const PaymentMethodIcon: React.FC<PaymentMethodIconProps> = ({ payment, className = "h-5 w-5" }) => {
  const getIcon = () => {
    switch (payment.type) {
      case 'ewallet':
        return <Smartphone className={className} />;
      case 'transfer':
        return <CreditCard className={className} />;
      case 'qris':
        return <QrCode className={className} />;
      case 'card':
        return <CreditCard className={className} />;
      case 'paypal':
        return <CreditCard className={className} />;
      case 'bank':
        return <CreditCard className={className} />;
      default:
        return <CreditCard className={className} />;
    }
  };

  const getColor = () => {
    switch (payment.name) {
      case 'GoPay':
        return 'text-blue-600';
      case 'OVO':
        return 'text-purple-600';
      case 'DANA':
        return 'text-blue-500';
      case 'ShopeePay':
        return 'text-orange-600';
      case 'QRIS':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className={`${getColor()} ${className}`}>
      {getIcon()}
    </div>
  );
};

export default PaymentMethodIcon; 