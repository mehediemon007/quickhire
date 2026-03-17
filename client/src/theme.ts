import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#4640DE',
        }
        
    },

    shape: {
        borderRadius: 12
    },

    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    marginBottom: 20,
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    height: 48,
                    fontSize: 14,
                    fontFamily: 'var(--font-body)',
                    borderRadius: 12,
                    color: '#202430',
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#dadce0',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'var(--color-primary)'
                    },
                    '&.Mui-error:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#d32f2f'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'var(--color-primary)'
                    },
                    '&.Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#d32f2f'
                    },
                },

                input: {
                    padding: 14
                }

            }
        },

        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontSize: 14,
                    fontFamily: 'var(--font-body)',
                    color: '#7C8493',
                    transform: 'translate(14px, 14px)',
                    backgroundColor: 'white',
                    paddingInline: '2px',
                    zIndex: 1,
                    '&.MuiInputLabel-shrink': {
                        transform: 'translate(14px, -11px)',
                        backgroundColor: 'white',
                    },
                    '&.Mui-focused': {
                        color: 'var(--color-primary)'
                    },
                    '&.Mui-error.Mui-focused': {
                        color: '#d32f2f'
                    }
                }
            }
        },

        MuiRadio: {
            styleOverrides: {
                root: {
                    color: 'var(--color-primary)',
                    '&.Mui-checked': {
                        color: 'var(--color-primary)'
                    },
                },
            },
        },

        MuiCheckbox: {
            styleOverrides: {
                root: {
                    color: 'var(--color-primary)',
                    '&.Mui-checked': {
                        color: 'var(--color-primary)',
                    },
                },
            },
        },

        MuiButton: {
            styleOverrides: {
                root: {
                    fontFamily: 'var(--font-epilogue)',
                    fontWeight: 400,
                    borderRadius: 12,
                    backgroundColor: 'var(--color-primary)',
                    textTransform: 'none',
                    '&:hover': {
                        backgroundColor: '#3530C4'
                    }
                },
                outlined: {
                    color: '#202430',
                    backgroundColor: 'transparent',
                    borderColor: '#dadce0',
                    '&:hover': {
                        backgroundColor: '#f5f5f5'
                    }
                }
            }
        },

        MuiTypography: {
            styleOverrides: {
                root: {
                    color: 'var(--color-primary)',
                },
                h1: {
                    fontFamily: 'var(--font-clash)',
                },
                h2: {
                    fontFamily: 'var(--font-clash)',
                },
                h3: {
                    fontFamily: 'var(--font-clash)',
                },
                h4: {
                    fontFamily: 'var(--font-clash)',
                },
                h5: {
                    fontFamily: 'var(--font-clash)',
                },
                h6: {
                    fontFamily: 'var(--font-clash)',
                },
                body1: {
                    fontFamily: 'var(--font-epilogue)',
                },
                body2: {
                    fontFamily: 'var(--font-epilogue)',
                },
                subtitle1: {
                    fontFamily: 'var(--font-epilogue)',
                },
                subtitle2: {
                    fontFamily: 'var(--font-epilogue)',
                },
                caption: {
                    fontFamily: 'var(--font-epilogue)',
                }   
            },
        }
    }
});

export default theme;