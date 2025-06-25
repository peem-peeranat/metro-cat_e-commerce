import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  TextField
} from '@mui/material';

// ฟอร์มเลือกวิธีการชำระเงินและกรอกข้อมูลบัตร
const PaymentMethodForm = ({
  formData,
  errors,
  handleChange,
  handleCardInput,
  fieldRefs
}) => (
  <>
    {/* เลือกวิธีการชำระเงิน */}
    <FormControl fullWidth error={!!errors.paymentMethod} sx={{ mb: 3 }}>
      <InputLabel
        shrink={true}
        sx={{
          color: '#6c757d',
          '&.Mui-focused': { color: '#ffc107' }
        }}
      >
        Payment Method<span style={{ color: '#d32f2f' }}> *</span>
      </InputLabel>
      <Select
        name="paymentMethod"
        value={formData.paymentMethod}
        onChange={handleChange}
        label="Payment Method"
        size="small"
        sx={{
          borderRadius: '8px',
          backgroundColor: '#f8f9fa',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#e0e0e0',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ffc107',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ffc107',
            borderWidth: '1px',
          },
          '& .MuiSelect-icon': {
            color: '#212327'
          }
        }}
        inputRef={fieldRefs && fieldRefs.paymentMethod}
      >
        <MenuItem value="credit">Credit Card</MenuItem>
        <MenuItem value="debit">Debit Card</MenuItem>
        <MenuItem value="paypal">PayPal</MenuItem>
      </Select>
      {errors.paymentMethod && (
        <Typography variant="caption" color="error" sx={{ ml: '4px' }}>
          {errors.paymentMethod}
        </Typography>
      )}
    </FormControl>

    {/* ถ้าเลือกบัตรเครดิตหรือเดบิต ให้แสดง input สำหรับกรอกข้อมูลบัตร */}
    {(formData.paymentMethod === 'credit' || formData.paymentMethod === 'debit') && (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* กรอกหมายเลขบัตร */}
        <TextField
          fullWidth
          required
          label="Card Number"
          InputLabelProps={{
            shrink: true,
            required: true,
            sx: { '& .MuiFormLabel-asterisk': { color: '#d32f2f' } }
          }}
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleCardInput}
          error={!!errors.cardNumber}
          helperText={errors.cardNumber}
          size="small"
          type="text"
          inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]*',
            maxLength: 16
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              backgroundColor: '#f8f9fa',
              '& fieldset': {
                borderColor: '#e0e0e0',
              },
              '&:hover fieldset': {
                borderColor: '#ffc107',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#ffc107',
                borderWidth: '1px',
              },
            },
            '& .MuiInputLabel-root': {
              color: '#6c757d',
              '&.Mui-focused': {
                color: '#ffc107',
              }
            }
          }}
          inputRef={fieldRefs && fieldRefs.cardNumber}
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          {/* กรอกวันหมดอายุ */}
          <TextField
            fullWidth
            required
            label="Expiration Date"
            InputLabelProps={{
              shrink: true,
              required: true,
              sx: { '& .MuiFormLabel-asterisk': { color: '#d32f2f' } }
            }}
            name="expiry"
            value={formData.expiry}
            onChange={handleCardInput}
            error={!!errors.expiry}
            helperText={errors.expiry}
            size="small"
            type="text"
            inputProps={{
              maxLength: 5,
              pattern: '(0[1-9]|1[0-2])\\/([0-9]{2})'
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                backgroundColor: '#f8f9fa',
                '& fieldset': {
                  borderColor: '#e0e0e0',
                },
                '&:hover fieldset': {
                  borderColor: '#ffc107',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#ffc107',
                  borderWidth: '1px',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#6c757d',
                '&.Mui-focused': {
                  color: '#ffc107',
                }
              }
            }}
            inputRef={fieldRefs && fieldRefs.expiry}
          />
          {/* กรอก CVV */}
          <TextField
            fullWidth
            required
            label="CVV"
            InputLabelProps={{
              shrink: true,
              required: true,
              sx: { '& .MuiFormLabel-asterisk': { color: '#d32f2f' } }
            }}
            name="cvv"
            value={formData.cvv}
            onChange={handleCardInput}
            error={!!errors.cvv}
            helperText={errors.cvv}
            size="small"
            type="password"
            inputProps={{
              inputMode: 'numeric',
              pattern: '[0-9]*',
              maxLength: 3
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                backgroundColor: '#f8f9fa',
                '& fieldset': {
                  borderColor: '#e0e0e0',
                },
                '&:hover fieldset': {
                  borderColor: '#ffc107',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#ffc107',
                  borderWidth: '1px',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#6c757d',
                '&.Mui-focused': {
                  color: '#ffc107',
                }
              }
            }}
            inputRef={fieldRefs && fieldRefs.cvv}
          />
        </Box>
      </Box>
    )}
  </>
);

export default PaymentMethodForm;