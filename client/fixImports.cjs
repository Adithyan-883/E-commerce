const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

const replacements = [
  { from: /import Navbar from '\.\/components\/Navbar'/g, to: "import Navbar from './components/common/Navbar'" },
  { from: /import Footer from '\.\/components\/Footer'/g, to: "import Footer from './components/common/Footer'" },
  { from: /from '\.\.\/components\/HeroSection'/g, to: "from '../components/home/HeroSection'" },
  { from: /from '\.\.\/components\/ProductCard'/g, to: "from '../components/product/ProductCard'" },
  { from: /from '\.\.\/components\/TestimonialCard'/g, to: "from '../components/home/TestimonialCard'" },
  { from: /from '\.\.\/data\/dummyData'/g, to: "from '../constants/dummyData'" },
  { from: /from '\.\.\/components\/CategoryCard'/g, to: "from '../components/product/CategoryCard'" },
  { from: /from '\.\.\/components\/CartItem'/g, to: "from '../components/cart/CartItem'" },
  { from: /from '\.\.\/components\/Loader'/g, to: "from '../components/common/Loader'" }
];

function readDirectory(dir) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      readDirectory(filePath);
    } else if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
      let content = fs.readFileSync(filePath, 'utf8');
      let modified = false;

      replacements.forEach(({ from, to }) => {
        if (from.test(content)) {
          content = content.replace(from, to);
          modified = true;
        }
      });

      if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated imports in ${filePath}`);
      }
    }
  });
}

readDirectory(directoryPath);
console.log("Import fixes complete.");
