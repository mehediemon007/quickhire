import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

interface SelectOption {
    label: string;
    value: string | number;
}

interface CustomSelectProps {
    value: string | number;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    options: SelectOption[];
    className?: string;
    name?: string;
}

export default function CustomSelect({ value, onChange, options = [], className } : CustomSelectProps) {
    return (
        <Box className={className} sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <NativeSelect
                    value={value}
                    onChange={onChange}
                    disableUnderline // Often cleaner if you are using custom Tailwind borders
                    inputProps={{
                        name: 'location',
                        id: 'location-select',
                    }}
                    sx={{
                        // This targets the internal select element for height/padding
                        '& .MuiNativeSelect-select': {
                            backgroundColor: 'transparent',
                        }
                    }}
                >
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </NativeSelect>
            </FormControl>
        </Box>
    );
}