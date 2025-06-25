import {
  Box,
  Card,
  CardContent,
  Typography
} from '@mui/material';
import {
  LocalShipping as ShippingIcon,
  Payment as PaymentIcon
} from '@mui/icons-material';
import ShippingInfoForm from './ShippingInfoForm';
import PaymentMethodForm from './PaymentMethodForm';

const CheckoutForm = ({ formData, errors, handleChange, fieldRefs }) => {
  // ฟังก์ชันจัดการ input เฉพาะของบัตรเครดิต/เดบิต (รับเฉพาะตัวเลขและจัดรูปแบบ)
  const handleCardInput = (e) => {
    const { name, value } = e.target;
    if (name === 'cardNumber' || name === 'cvv') {
      // รับเฉพาะตัวเลข
      const onlyNums = value.replace(/\D/g, '');
      handleChange({ target: { name, value: onlyNums } });
    } else if (name === 'expiry') {
      // รับเฉพาะตัวเลขและ auto ใส่ /
      let val = value.replace(/\D/g, '');
      if (val.length > 4) val = val.slice(0, 4);
      if (val.length > 2) val = val.slice(0, 2) + '/' + val.slice(2);
      handleChange({ target: { name, value: val } });
    } else {
      handleChange(e);
    }
  };

  return (
    <Box sx={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 3
    }}>
      {/* กล่องข้อมูลที่อยู่จัดส่ง */}
      <Card elevation={0} sx={{
        backgroundColor: '#ffffff',
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(33, 35, 39, 0.08)',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 8px 24px rgba(33, 35, 39, 0.12)'
        }
      }}>
        <CardContent>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 3,
            color: '#212327'
          }}>
            <ShippingIcon sx={{
              mr: 1.5,
              color: '#ffc107',
              fontSize: '28px'
            }} />
            <Typography variant="h6" sx={{
              fontWeight: '600',
              fontSize: '1.25rem',
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: '-8px',
                left: 0,
                width: '40px',
                height: '3px',
                backgroundColor: '#ffc107',
                borderRadius: '2px'
              }
            }}>
              Shipping Information
            </Typography>
          </Box>
          <ShippingInfoForm
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            fieldRefs={fieldRefs}
          />
        </CardContent>
      </Card>

      {/* กล่องข้อมูลการชำระเงิน */}
      <Card elevation={0} sx={{
        backgroundColor: '#ffffff',
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(33, 35, 39, 0.08)',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 8px 24px rgba(33, 35, 39, 0.12)'
        }
      }}>
        <CardContent>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 3,
            color: '#212327'
          }}>
            <PaymentIcon sx={{
              mr: 1.5,
              color: '#ffc107',
              fontSize: '28px'
            }} />
            <Typography variant="h6" sx={{
              fontWeight: '600',
              fontSize: '1.25rem',
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: '-8px',
                left: 0,
                width: '40px',
                height: '3px',
                backgroundColor: '#ffc107',
                borderRadius: '2px'
              }
            }}>
              Payment Method
            </Typography>
          </Box>
          <PaymentMethodForm
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            handleCardInput={handleCardInput}
            fieldRefs={fieldRefs}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default CheckoutForm;