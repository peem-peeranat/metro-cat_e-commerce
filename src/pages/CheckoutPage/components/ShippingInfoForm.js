import { Box, TextField } from '@mui/material';

// รายชื่อฟิลด์สำหรับข้อมูลที่อยู่จัดส่ง
const shippingFields = [
  'firstName', 'lastName', 'address', 'city', 'state', 'country'
];

// ฟอร์มกรอกข้อมูลที่อยู่จัดส่ง
const ShippingInfoForm = ({ formData, errors, handleChange, fieldRefs }) => (
  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
    {/* วนลูปสร้าง input สำหรับแต่ละฟิลด์ */}
    {shippingFields.map((field) => (
      <Box
        key={field}
        sx={{
          flex: ['address'].includes(field) ? '1 1 100%' : '1 1 calc(50% - 8px)',
          minWidth: '200px'
        }}
      >
        <TextField
          fullWidth
          required
          label={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
          InputLabelProps={{
            shrink: true,
            required: true,
            sx: { '& .MuiFormLabel-asterisk': { color: '#d32f2f' } }
          }}
          name={field}
          value={formData[field]}
          onChange={handleChange}
          error={!!errors[field]}
          helperText={errors[field]}
          size="small"
          type="text"
          inputRef={fieldRefs && fieldRefs[field]}
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
            },
            '& .MuiFormHelperText-root': {
              marginLeft: '4px',
              fontSize: '0.75rem'
            }
          }}
        />
      </Box>
    ))}
    {/* ช่องกรอก Zip Code */}
    <Box sx={{ flex: '1 1 calc(50% - 8px)', minWidth: '200px' }}>
      <TextField
        fullWidth
        required
        label="Zip Code"
        InputLabelProps={{
          shrink: true,
          required: true,
          sx: { '& .MuiFormLabel-asterisk': { color: '#d32f2f' } }
        }}
        name="zipCode"
        value={formData.zipCode}
        onChange={handleChange}
        error={!!errors.zipCode}
        helperText={errors.zipCode}
        size="small"
        type="text"
        inputProps={{
          inputMode: 'numeric',
          pattern: '[0-9]*',
          maxLength: 10
        }}
        inputRef={fieldRefs && fieldRefs.zipCode}
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
          },
          '& .MuiFormHelperText-root': {
            marginLeft: '4px',
            fontSize: '0.75rem'
          }
        }}
      />
    </Box>
    {/* ช่องกรอก Email */}
    <Box sx={{ flex: '1 1 calc(50% - 8px)', minWidth: '200px' }}>
      <TextField
        fullWidth
        required
        label="Email"
        InputLabelProps={{
          shrink: true,
          required: true,
          sx: { '& .MuiFormLabel-asterisk': { color: '#d32f2f' } }
        }}
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
        size="small"
        type="email"
        inputRef={fieldRefs && fieldRefs.email}
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
          },
          '& .MuiFormHelperText-root': {
            marginLeft: '4px',
            fontSize: '0.75rem'
          }
        }}
      />
    </Box>
    {/* ช่องกรอกเบอร์โทรศัพท์ */}
    <Box sx={{ flex: '1 1 calc(50% - 8px)', minWidth: '200px' }}>
      <TextField
        fullWidth
        required
        label="Phone"
        InputLabelProps={{
          shrink: true,
          required: true,
          sx: { '& .MuiFormLabel-asterisk': { color: '#d32f2f' } }
        }}
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        error={!!errors.phone}
        helperText={errors.phone}
        size="small"
        type="tel"
        inputProps={{
          inputMode: 'numeric',
          pattern: '[0-9]*',
          maxLength: 10
        }}
        inputRef={fieldRefs && fieldRefs.phone}
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
          },
          '& .MuiFormHelperText-root': {
            marginLeft: '4px',
            fontSize: '0.75rem'
          }
        }}
      />
    </Box>
  </Box>
);

export default ShippingInfoForm;