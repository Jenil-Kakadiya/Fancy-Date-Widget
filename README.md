# 📅 Fancy Date Widget

A simple and customizable date picker component for React applications.

## 🚀 Installation

Install `fancy-date-widget` via npm:

```bash
npm install fancy-date-widget
```

Or using yarn:

```bash
yarn add fancy-date-widget
```

## 💻 Usage

Here's a basic example of how to use the FancyDateWidget component:

```jsx
import React from "react";
import FancyDateWidget from "fancy-date-widget";

const App = () => {
  return (
    <div>
      <h2>Select a Date:</h2>
      <FancyDateWidget 
        format="YYYY-MM-DD"
        onChange={(date) => console.log(date)}
      />
    </div>
  );
};

export default App;
```

## ⚙️ Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `format` | string | `"YYYY-MM-DD"` | Date format string (follows Moment.js format) |
| `onChange` | function | `undefined` | Callback function that receives the selected date |
| `value` | Date | `null` | Initial date value |
| `minDate` | Date | `null` | Minimum selectable date |
| `maxDate` | Date | `null` | Maximum selectable date |
| `disabled` | boolean | `false` | Disables the date picker |
| `placeholder` | string | `"Select date"` | Placeholder text when no date is selected |
| `className` | string | `""` | Additional CSS classes |
| `yearRange` | [number, number] | `[1900, current year]` | Configurable year range |
| `locale` | string | `"en"` | Language/locale for the date picker |

## 🎨 Customization

You can customize the appearance using CSS variables:

```css
.fancy-date-widget {
  --primary-color: #3b82f6;
  --text-color: #374151;
  --background-color: #ffffff;
  --border-color: #e5e7eb;
  --hover-color: #f3f4f6;
}
```

## 📱 Features

- 📆 Responsive design
- 🌐 Internationalization support
- ⌨️ Keyboard navigation
- 🎯 Range selection
- 🎨 Customizable themes
- ♿ Accessibility compliance
- 📱 Mobile-friendly interface

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## 📚 Examples

### Basic Usage
```jsx
<FancyDateWidget />
```

### Custom Format
```jsx
<FancyDateWidget format="MM/DD/YYYY" />
```

### With Min/Max Dates
```jsx
<FancyDateWidget 
  minDate={new Date('2023-01-01')}
  maxDate={new Date('2024-12-31')}
/>
```

### With Custom Locale
```jsx
<FancyDateWidget locale="fr" />
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Contributors who have helped improve this widget
- Open source community for inspiration and support
