// https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/defaultConfig.stub.js#L7
const plugin = require('tailwindcss/plugin');
module.exports = {
  purge: ["./public/**/*.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#0d6efd',
        danger: '#dc3545',
        warning: '#ffc107',
        info: '#0dcaf0',
      },
    },
  },
  variants: {
    extend: {
      // https://tailwindcss.com/docs/configuring-variants#default-variants-reference
      // opacity: ['required', 'disabled'],
      textColor: ['required', 'important'],
      fontSize: ['required', 'important', 'disabled', 'logged-in'],
      borderRadius: ['important', 'disabled'],
    },
  },
  plugins: [
    plugin(function({ addUtilities, addVariant, e, variants, addComponents, theme  }) {
      
      const newUtilities = {
        '.skew-10deg': {
          transform: 'skewY(-10deg)',
        },
        '.skew-15deg': {
          transform: 'skewY(-15deg)',
        },
      }
      addUtilities(newUtilities);

      const buttons = {
        '.btn' : {
          display: 'inline-block',
          fontWeight: 400,
          lineHeight: 1.5,
          textAlign: 'center',
          verticalAlign: 'middle',
          userSelect: 'none',
          border: '1px solid transparent',
          padding: '0.375rem 0.75rem',
          fontSize: '1rem',
          borderRadius: '.25rem'
        }
      }
      addComponents(buttons);

      // console.log(theme('spacing'));
      const spacingPX = Object.keys(theme('spacing'))
        .reduce((prev , key) => {
          prev[key] = '16px';
          return prev;
        }, {});
      // addUtilities(spacingPX);
      // console.log(spacingPX);
      // console.log(theme('fontSize'));

      addVariant('required', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`required${separator}${className}`)}`
        })
      });

      addVariant('disabled', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`disabled${separator}${className}`)}:disabled`
        })
      })

      addVariant('logged-in', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `body[class*="logged-in"] .${e(`logged-in${separator}${className}`)}`
        })
      })

      addVariant('important', ({ container }) => {
        container.walkRules((rule) => {
          rule.selector = `.${rule.selector.slice(1)}\\!`;
          rule.walkDecls(decl => {
            decl.important = true;
          });
        });
      });
    })
  ],
};
