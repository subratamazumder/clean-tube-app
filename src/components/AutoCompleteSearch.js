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
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : (
                  <IconButton 
                    onClick={() => inputValue && onSearch(inputValue)}
                    edge="end"
                  >
                    <SearchIcon />
                  </IconButton>
                )}
              </>
            ),
            style: { 
              borderRadius: '24px', 
              backgroundColor: 'white',
            }
          }}
          sx={{
          width: '100%',
          maxWidth: 'none',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        }}
        />
      )}
    />
  );
};

export default AutoCompleteSearch;