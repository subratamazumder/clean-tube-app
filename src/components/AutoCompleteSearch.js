import { useState, useEffect } from 'react';
import { Autocomplete, TextField, CircularProgress, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const AutoCompleteSearch = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (inputValue.length > 2) {
      setLoading(true);
      const timer = setTimeout(() => {
        fetch(`/api/suggestions?q=${encodeURIComponent(inputValue)}`)
          .then(res => res.json())
          .then(setOptions)
          .catch(() => setOptions([]))
          .finally(() => setLoading(false));
      }, 300);
      
      return () => clearTimeout(timer);
    } else {
      setOptions([]);
    }
  }, [inputValue]);

  return (
    <Autocomplete
      freeSolo
      options={options}
      loading={loading}
      onInputChange={(_, value) => setInputValue(value)}
      onChange={(_, value) => value && onSearch(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          placeholder="Search videos..."
          InputProps={{
            ...params.InputProps,
            sx: {
              borderRadius: '28px',
              paddingRight: '4px',
              backgroundColor: 'background.paper',
              '& .MuiOutlinedInput-notchedOutline': {
                border: '1px solid',
                borderColor: 'divider',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'text.secondary',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
                borderWidth: '1px',
              },
              '& input': {
                padding: '12px 16px',
              },
            },
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress 
                    color="inherit" 
                    size={20} 
                    sx={{ mr: 1 }} 
                  />
                ) : (
                  <IconButton 
                    onClick={() => inputValue && onSearch(inputValue)}
                    edge="end"
                    sx={{
                      color: 'text.secondary',
                      '&:hover': {
                        color: 'primary.main',
                        backgroundColor: 'transparent',
                      },
                    }}
                  >
                    <SearchIcon />
                  </IconButton>
                )}
              </>
            ),
          }}
          sx={{
            width: '100%',
            '& .MuiOutlinedInput-root': {
              paddingRight: '0 !important',
              height: '48px',
            },
          }}
        />
      )}
      sx={{
        '& .MuiAutocomplete-popupIndicator': {
          display: 'none',
        },
      }}
    />
  );
};

export default AutoCompleteSearch;