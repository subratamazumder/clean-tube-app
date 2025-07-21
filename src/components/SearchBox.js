import { useState } from 'react';
import { useRouter } from 'next/router';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBox = ({ initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search videos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton type="submit">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
          style: { borderRadius: '24px', backgroundColor: 'white' },
        }}
        sx={{
          width: '100%',
          maxWidth: 'none',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        }}
      />
    </form>
  );
};

export default SearchBox;