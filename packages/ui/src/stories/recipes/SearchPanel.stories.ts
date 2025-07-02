import { StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { sstLogo } from '../assets/sstLogo.ts';
import { repeat } from 'lit/directives/repeat.js';

const meta = {
  title: 'Studs/Recipes/SearchPanel',
  tags: ['autodocs'],
  argTypes: {}
};

export default meta;

type Story = StoryObj<{}>
export const SearchPanel: Story = {

  render: () => {
    return html`
      <style>
        body {
          /* Sorry JP, I had to do it */
          padding: 0 !important;
        }

        studs-app-shell > header {
          padding-inline: 20px;

          .container {
            margin: 0 auto;
            max-width: 1440px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        }

        studs-app-shell > main {
          width: 100%;

          max-width: 1440px;
          margin: 0 auto;

          section[id] {
            h2 {
              text-transform: capitalize;
            }

            .items {
              display: grid;
              grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
              gap: 2rem;
              padding: 1rem;
            }
          }
        }

        studs-drawer {
          .wrapper {
            height: 100%;
            display: flex;
            flex-direction: column;

            header {
              padding: 1rem;
              border-bottom: 1px solid var(--border-color);
              display: flex;
              justify-content: space-between;
              align-items: center;
            }

            main {
              flex: 1;
              overflow-y: auto;
            }

            footer {
              padding: 1rem;
              border-top: 1px solid var(--border-color);
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
          }
          .filterable-types {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
          }
      </style>
      <studs-app-shell>
        <header slot="header">
          <div class="container">
            ${sstLogo}
            <studs-drawer position="right" size="medium" close-on-esc="">
              <studs-button slot="toggle" button-type="tertiary">
                <studs-badge icon="filter_alt"></studs-badge>
              </studs-button>
              <div class="wrapper">
                <header>
                  <strong>Search Items</strong>
                  <studs-button button-type="close" icon="close"></studs-button>
                </header>
                <main>
                  <div class="items">
                    <studs-accordion enable-header="" enable-search="" size="medium" variant="borderless"
                                     direction="end">
                      <studs-accordion-item ?open=${true}>
                        <div slot="toggle">Search by Item</div>
                          <form id="search">
                            <studs-form-control>
                              <studs-input name="search_by_item" type="search" placeholder="Enter an item"></studs-input>
                                <studs-helper-text>Search by item name</studs-helper-text>
                            </studs-form-control>
                          </form>
                      </studs-accordion-item>
                      <studs-accordion-item>
                        <div slot="toggle">Filter by Type</div>
                        <div class="filterable-types">
                        </div>
                      </studs-accordion-item>
                      <studs-accordion-item>
                        <div slot="toggle">Filter by Starting Letter</div>
                        <studs-form-control>
                          <studs-checkbox-group name="letters">
                          </studs-checkbox-group>
                        </studs-form-control>
                      </studs-accordion-item>
                    </studs-accordion>
                  </div>
                </main>
                <footer>
                  <studs-button button-type="tertiary" type="reset">Reset</studs-button>
                </footer>
              </div>
            </studs-drawer>
          </div>
        </header>
        <main>
          
        </main>
      </studs-app-shell>
      <script type="text/javascript">
        // Searchable Items
        const searchableItems = {
          fruits: [
            { name: 'Apple', id: 'apple' },
            { name: 'Banana', id: 'banana' },
            { name: 'Orange', id: 'orange' },
            { name: 'Grapes', id: 'grapes' },
            { name: 'Strawberries', id: 'strawberries' },
            { name: 'Blueberries', id: 'blueberries' },
            { name: 'Raspberries', id: 'raspberries' },
            { name: 'Blackberries', id: 'blackberries' },
            { name: 'Pineapple', id: 'pineapple' },
            { name: 'Kiwi', id: 'kiwi' },
            { name: 'Mango', id: 'mango' },
            { name: 'Peach', id: 'peach' },
            { name: 'Plum', id: 'plum' },
            { name: 'Pear', id: 'pear' },
            { name: 'Cherry', id: 'cherry' },
            { name: 'Watermelon', id: 'watermelon' },
            { name: 'Cantaloupe', id: 'cantaloupe' },
            { name: 'Honeydew', id: 'honeydew' },
            { name: 'Papaya', id: 'papaya' },
            { name: 'Lemon', id: 'lemon' },
            { name: 'Lime', id: 'lime' },
            { name: 'Grapefruit', id: 'grapefruit' },
            { name: 'Pomegranate', id: 'pomegranate' },
            { name: 'Coconut', id: 'coconut' },
            { name: 'Avocado', id: 'avocado' },
            { name: 'Tomato', id: 'tomato' },
            { name: 'Cucumber', id: 'cucumber' },
            { name: 'Bell Pepper', id: 'bell-pepper' },
            { name: 'Carrot', id: 'carrot' },
            { name: 'Celery', id: 'celery' },
            { name: 'Onion', id: 'onion' },
            { name: 'Garlic', id: 'garlic' },
            { name: 'Ginger', id: 'ginger' },
            { name: 'Potato', id: 'potato' },
            { name: 'Sweet Potato', id: 'sweet-pot' }
          ],
          vegetables: [
            { name: 'Broccoli', id: 'broccoli' },
            { name: 'Cauliflower', id: 'cauliflower' },
            { name: 'Brussels Sprouts', id: 'brussels-sprouts' },
            { name: 'Asparagus', id: 'asparagus' },
            { name: 'Spinach', id: 'spinach' },
            { name: 'Kale', id: 'kale' },
            { name: 'Swiss Chard', id: 'swiss-chard' },
            { name: 'Collard Greens', id: 'collard-greens' },
            { name: 'Mustard Greens', id: 'mustard-greens' },
            { name: 'Turnip Greens', id: 'turnip-greens' },
            { name: 'Beet Greens', id: 'beet-greens' },
            { name: 'Romaine Lettuce', id: 'romaine-lettuce' },
            { name: 'Iceberg Lettuce', id: 'iceberg-lettuce' },
            { name: 'Arugula', id: 'arugula' },
            { name: 'Watercress', id: 'watercress' },
            { name: 'Endive', id: 'endive' },
            { name: 'Radish', id: 'radish' },
            { name: 'Turnip', id: 'turnip' },
            { name: 'Rutabaga', id: 'rutabaga' },
            { name: 'Parsnip', id: 'parsnip' },
            { name: 'Zucchini', id: 'zucchini' },
            { name: 'Yellow Squash', id: 'yellow-squash' },
            { name: 'Spaghetti Squash', id: 'spaghetti-squash' },
            { name: 'Acorn Squash', id: 'acorn-squash' },
            { name: 'Butternut Squash', id: 'butternut-squash' },
            { name: 'Pumpkin', id: 'pumpkin' },
            { name: 'Green Beans', id: 'green-beans' },
            { name: 'Wax Beans', id: 'wax-beans' }
          ],
          meats: [
            { name: 'Beef', id: 'beef' },
            { name: 'Pork', id: 'pork' },
            { name: 'Chicken', id: 'chicken' },
            { name: 'Turkey', id: 'turkey' },
            { name: 'Duck', id: 'duck' },
            { name: 'Goose', id: 'goose' },
            { name: 'Lamb', id: 'lamb' },
            { name: 'Venison', id: 'venison' },
            { name: 'Rabbit', id: 'rabbit' },
            { name: 'Quail', id: 'quail' },
            { name: 'Pheasant', id: 'pheasant' },
            { name: 'Dove', id: 'dove' },
            { name: 'Grouse', id: 'grouse' },
            { name: 'Partridge', id: 'partridge' },
            { name: 'Buffalo', id: 'buffalo' },
            { name: 'Elk', id: 'elk' },
            { name: 'Ostrich', id: 'ostrich' },
            { name: 'Emu', id: 'emu' },
            { name: 'Kangaroo', id: 'kangaroo' },
            { name: 'Alligator', id: 'alligator' },
            { name: 'Snake', id: 'snake' },
            { name: 'Turtle', id: 'turtle' },
            { name: 'Frog', id: 'frog' },
            { name: 'Crab', id: 'crab' },
            { name: 'Lobster', id: 'lobster' },
            { name: 'Shrimp', id: 'shrimp' },
            { name: 'Crawfish', id: 'crawfish' },
            { name: 'Clams', id: 'clams' },
            { name: 'Mussels', id: 'mussels' },
            { name: 'Oysters', id: 'oysters' },
            { name: 'Scallops', id: 'scallops' },
            { name: 'Squid', id: 'squid' },
            { name: 'Octopus', id: 'octopus' }
          ],
          dairy: [
            { name: 'Milk', id: 'milk' },
            { name: 'Butter', id: 'butter' },
            { name: 'Cheese', id: 'cheese' },
            { name: 'Yogurt', id: 'yogurt' },
            { name: 'Sour Cream', id: 'sour-cream' },
            { name: 'Cream Cheese', id: 'cream-cheese' },
            { name: 'Cottage Cheese', id: 'cottage-cheese' },
            { name: 'Ricotta Cheese', id: 'ricotta-cheese' },
            { name: 'Mascarpone Cheese', id: 'mascarpone-cheese' },
            { name: 'Goat Cheese', id: 'goat-cheese' },
            { name: 'Feta Cheese', id: 'feta-cheese' },
            { name: 'Blue Cheese', id: 'blue-cheese' },
            { name: 'Gorgonzola Cheese', id: 'gorgonzola-cheese' },
            { name: 'Parmesan Cheese', id: 'parmesan-cheese' },
            { name: 'Romano Cheese', id: 'romano-cheese' },
            { name: 'Cheddar Cheese', id: 'cheddar-cheese' },
            { name: 'Swiss Cheese', id: 'swiss-cheese' },
            { name: 'Provolone Cheese', id: 'provolone-cheese' },
            { name: 'Mozzarella Cheese', id: 'mozzarella-cheese' },
            { name: 'Gouda Cheese', id: 'gouda-cheese' },
            { name: 'Havarti Cheese', id: 'havarti-cheese' },
            { name: 'Monterey Jack Cheese', id: 'monterey-jack-cheese' },
            { name: 'Pepper Jack Cheese', id: 'pepper-jack-cheese' },
            { name: 'Colby Cheese', id: 'colby-cheese' },
            { name: 'Colby Jack Cheese', id: 'colby-jack-cheese' },
            { name: 'Muenster Cheese', id: 'muenster-cheese' },
            { name: 'Brie Cheese', id: 'brie' }
          ],
          grains: [
            { name: 'Wheat', id: 'wheat' },
            { name: 'Rice', id: 'rice' },
            { name: 'Barley', id: 'barley' },
            { name: 'Oats', id: 'oats' },
            { name: 'Corn', id: 'corn' },
            { name: 'Rye', id: 'rye' },
            { name: 'Millet', id: 'millet' },
            { name: 'Quinoa', id: 'quinoa' },
            { name: 'Buckwheat', id: 'buckwheat' },
            { name: 'Amaranth', id: 'amaranth' },
            { name: 'Teff', id: 'teff' },
            { name: 'Sorghum', id: 'sorghum' },
            { name: 'Farro', id: 'farro' },
            { name: 'Spelt', id: 'spelt' },
            { name: 'Kamut', id: 'kamut' },
            { name: 'Freekeh', id: 'freekeh' },
            { name: 'Bulgur', id: 'bulgur' },
            { name: 'Couscous', id: 'couscous' },
            { name: 'Pasta', id: 'pasta' },
            { name: 'Bread', id: 'bread' },
            { name: 'Tortillas', id: 'tortillas' },
            { name: 'Crackers', id: 'crackers' },
            { name: 'Cereal', id: 'cereal' },
            { name: 'Granola', id: 'granola' },
            { name: 'Oatmeal', id: 'oatmeal' },
            { name: 'Popcorn', id: 'popcorn' },
            { name: 'Chips', id: 'chips' },
            { name: 'Pretzels', id: 'pretzels' },
            { name: 'Pita', id: 'pita' },
            { name: 'Naan', id: 'naan' },
            { name: 'Bagels', id: 'bagels' },
            { name: 'English Muffins', id: 'english-muff' }
          ],
          spices: [
            { name: 'Salt', id: 'salt' },
            { name: 'Pepper', id: 'pepper' },
            { name: 'Garlic Powder', id: 'garlic-powder' },
            { name: 'Onion Powder', id: 'onion-powder' },
            { name: 'Paprika', id: 'paprika' },
            { name: 'Chili Powder', id: 'chili-powder' },
            { name: 'Cayenne Pepper', id: 'cayenne-pepper' },
            { name: 'Red Pepper Flakes', id: 'red-pepper-flakes' },
            { name: 'Cumin', id: 'cumin' },
            { name: 'Coriander', id: 'coriander' },
            { name: 'Turmeric', id: 'turmeric' },
            { name: 'Ginger', id: 'ginger' },
            { name: 'Cinnamon', id: 'cinnamon' },
            { name: 'Nutmeg', id: 'nutmeg' },
            { name: 'Allspice', id: 'allspice' },
            { name: 'Cloves', id: 'cloves' },
            { name: 'Cardamom', id: 'cardamom' },
            { name: 'Mustard Powder', id: 'mustard-powder' },
            { name: 'Celery Seed', id: 'celery-seed' },
            { name: 'Dill Seed', id: 'dill-seed' },
            { name: 'Fennel Seed', id: 'fennel-seed' },
            { name: 'Poppy Seed', id: 'poppy-seed' },
            { name: 'Caraway Seed', id: 'caraway-seed' },
            { name: 'Anise Seed', id: 'anise-seed' },
            { name: 'Sesame Seed', id: 'sesame-seed' },
            { name: 'Cumin Seed', id: 'cumin-seed' },
            { name: 'Coriander Seed', id: 'coriander-seed' },
            { name: 'Mustard Seed', id: 'mustard-seed' },
            { name: 'Black Pepper', id: 'black-pepper' }
          ],
          condiments: [
            { name: 'Ketchup', id: 'ketchup' },
            { name: 'Mustard', id: 'mustard' },
            { name: 'Mayonnaise', id: 'mayonnaise' },
            { name: 'Soy Sauce', id: 'soy-sauce' },
            { name: 'Worcestershire Sauce', id: 'worcestershire-sauce' },
            { name: 'Vinegar', id: 'vinegar' },
            { name: 'Hot Sauce', id: 'hot-sauce' },
            { name: 'Salsa', id: 'salsa' },
            { name: 'Barbecue Sauce', id: 'barbecue-sauce' },
            { name: 'Honey', id: 'honey' },
            { name: 'Maple Syrup', id: 'maple-syrup' },
            { name: 'Jam', id: 'jam' },
            { name: 'Jelly', id: 'jelly' },
            { name: 'Peanut Butter', id: 'peanut-butter' },
            { name: 'Nutella', id: 'nutella' },
            { name: 'Tahini', id: 'tahini' },
            { name: 'Hummus', id: 'hummus' },
            { name: 'Guacamole', id: 'guacamole' },
            { name: 'Sour Cream', id: 'sour-cream' },
            { name: 'Cream Cheese', id: 'cream-cheese' },
            { name: 'Sour Cream', id: 'sour-cream' },
            { name: 'Cream Cheese', id: 'cream-cheese' },
            { name: 'Sour Cream', id: 'sour-cream' },
            { name: 'Cream Cheese', id: 'cream-cheese' },
            { name: 'Sour Cream', id: 'sour-cream' },
            { name: 'Cream Cheese', id: 'cream-cheese' },
            { name: 'Sour Cream', id: 'sour-cream' },
            { name: 'Cream Cheese', id: 'cream-cheese' },
            { name: 'Sour Cream', id: 'sour-cream' },
            { name: 'Cream Cheese', id: 'cream-cheese' }
          ],
          beverages: [
            { name: 'Water', id: 'water' },
            { name: 'Milk', id: 'milk' },
            { name: 'Juice', id: 'juice' },
            { name: 'Soda', id: 'soda' },
            { name: 'Tea', id: 'tea' },
            { name: 'Coffee', id: 'coffee' },
            { name: 'Beer', id: 'beer' },
            { name: 'Wine', id: 'wine' },
            { name: 'Liquor', id: 'liquor' }
          ],
          snacks: [
            { name: 'Chips', id: 'chips' },
            { name: 'Pretzels', id: 'pretzels' },
            { name: 'Popcorn', id: 'popcorn' },
            { name: 'Crackers', id: 'crackers' },
            { name: 'Cookies', id: 'cookies' },
            { name: 'Candy', id: 'candy' },
            { name: 'Chocolate', id: 'chocolate' },
            { name: 'Gum', id: 'gum' },
            { name: 'Nuts', id: 'nuts' },
            { name: 'Seeds', id: 'seeds' },
            { name: 'Trail Mix', id: 'trail-mix' },
            { name: 'Granola Bars', id: 'granola-bars' },
            { name: 'Protein Bars', id: 'protein-bars' },
            { name: 'Energy Bars', id: 'energy-bars' },
            { name: 'Fruit Snacks', id: 'fruit-snacks' },
            { name: 'Fruit Leather', id: 'fruit-leather' },
            { name: 'Jerky', id: 'jerky' },
            { name: 'Pork Rinds', id: 'pork-rinds' },
            { name: 'Cheese Puffs', id: 'cheese-puffs' },
            { name: 'Cheese Balls', id: 'cheese-balls' },
            { name: 'Rice Cakes', id: 'rice-cakes' },
            { name: 'Pita Chips', id: 'pita-chips' },
            { name: 'Tortilla Chips', id: 'tortilla-chips' },
            { name: 'Salsa', id: 'salsa' },
            { name: 'Guacamole', id: 'guacamole' },
            { name: 'Hummus', id: 'hummus' },
            { name: 'Dip', id: 'dip' },
            { name: 'Sauce', id: 'sauce' },
            { name: 'Salsa', id: 'salsa' },
            { name: 'Guacamole', id: 'guacamole' },
            { name: 'Hummus', id: 'hummus' }
          ]
        };
        let selectedToggles = [];
        let selectedLetter;
        let query;
        let items = {...searchableItems};
        // Submit Events
        async function onSearchSubmit(event) {
          event.preventDefault();
          const formData = new FormData(event.target);
          const searchByItem = formData.get('search_by_item');
          if(searchByItem) {
            query = searchByItem;
            await filterSearch(searchByItem);
            generate();
          }
        }
        // Reset Events
        function onReset(event) {
          event.preventDefault();
          items = {...searchableItems};
          const searchForm = document.getElementById('search');
          searchForm.reset();
          query = undefined;
          selectedToggles = [];
          selectedLetter = undefined;
          generate();
        }
        // Change Events
        async function onFilterTypeChange(event) {
          const toggles = document.querySelectorAll('studs-toggle-button');
          toggles.forEach(toggle => {
            const type = toggle.textContent;
            const isChecked = toggle.selected;
            const selectedTogglesHasType = selectedToggles.includes(type);
            if(isChecked) {
              if(!selectedTogglesHasType) selectedToggles.push(type);
              items[type] = searchableItems[type];
            } else if(selectedTogglesHasType && !isChecked) {
              selectedToggles = selectedToggles.filter(toggle => toggle !== type);
              items[type] = [];
            }
            else {
              items[type] = [];
            }
          });
          
          if(selectedToggles.length === 0) {
            items = { ...searchableItems };
          }
          await filterSearch(query);
          generate();
        }
        async function onFilterLetterChange(event) {
          if(selectedLetter || !event.target.checked) {
            selectedLetter = undefined;
            items = { ...searchableItems };
          }
          if(event.target.checked) {
            selectedLetter = event.target.value;
            await Object.keys(items).forEach(category => {
              items[category] = items[category].filter(item => item.name.toLowerCase().startsWith(selectedLetter))
            });
          }
          generate();
        }
        // DOM Element Generations
        function createFoodCard(item) {
          const card = document.createElement('studs-card');
          const header = document.createElement('header');
          header.setAttribute('slot', 'title');
          const h3 = document.createElement('h3');
          h3.textContent = item.name;
          header.appendChild(h3);
          const footer = document.createElement('footer');
          footer.setAttribute('slot', 'footer');
          const button = document.createElement('studs-button');
          button.setAttribute('button-type', 'primary');
          button.textContent = 'Add to Cart';
          footer.appendChild(button);
          card.appendChild(header);
          card.appendChild(footer);
          
          return card;
        }
        function createFilterCard(category) {
          const badge = document.createElement('studs-badge');
          badge.setAttribute('count', items[category].length);
          const toggleButton = document.createElement('studs-toggle-button');
          toggleButton.removeEventListener('toggle-selected', onFilterTypeChange);
          toggleButton.setAttribute('button-type', 'secondary');
          toggleButton.textContent = category;
          toggleButton.addEventListener('toggle-selected', onFilterTypeChange);
          toggleButton.selected = selectedToggles.includes(category);
          badge.appendChild(toggleButton);
          return badge;
        }
        function createLetterCheckbox(letter) {
          const count = countItemsStartingWithLetter(searchableItems, letter);
          const checkbox = document.createElement('studs-checkbox');
          checkbox.setAttribute('value', letter);
          checkbox.setAttribute('label', letter.toUpperCase() + " " + count);
          if(selectedLetter === letter) checkbox.checked = true;
          if(count === 0) checkbox.toggleAttribute('disabled', true);
          return checkbox;
        }
        function generateCategories() {
          const main = document.querySelector('studs-app-shell > main');
          // Clear DOM First
          main.innerHTML = '';
          Object.keys(items).forEach(category => {
            if(items[category].length === 0) return;
            const section = document.createElement('section');
            section.setAttribute('id', category);
            const h2 = document.createElement('h2');
            h2.textContent = category;
            section.appendChild(h2);
            const itemsContainer = document.createElement('div');
            itemsContainer.classList.add('items');
            items[category].forEach(item => {
              itemsContainer.appendChild(createFoodCard(item));
            });
            section.appendChild(itemsContainer);
            main.appendChild(section);
          });
        }
        function generateFilterableTypes() {
          const filterableTypes = document.querySelector('.filterable-types');
          // Clear DOM First
          filterableTypes.innerHTML = '';
          Object.keys(items).forEach(category => {
            filterableTypes.appendChild(createFilterCard(category));
          });
        }
        function generateLetterCheckboxes() {
          const letterCheckboxes = document.querySelector('studs-checkbox-group[name="letters"]');
          // Clear DOM First
          letterCheckboxes.innerHTML = '';
          ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'].forEach(letter => {
            letterCheckboxes.appendChild(createLetterCheckbox(letter));
          });
        }
        function generate() {
          generateCategories();
          generateFilterableTypes();
          generateLetterCheckboxes();
        }
        // Functions
        function handleDrawerToggle() {
          const drawer = document.querySelector('studs-drawer');
          const closeBtn = document.querySelector('studs-button[button-type="close"]');

          closeBtn.addEventListener('click', () => drawer.toggle());
        }
        function countItemsStartingWithLetter(items, letter) {
          let count = 0;
          Object.keys(items).forEach(category => {
            items[category].forEach((item) => {
              if (item.name.toLowerCase().startsWith(letter.toLowerCase())) {
                count++;
              }
            });
          });
          return count;
        }
        async function filterSearch(query) {
          if(query) await Object.keys(items).forEach(category => {
            items[category] = items[category].filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
          });
        }
        // Put it all together
        document.addEventListener('DOMContentLoaded', () => {
          handleDrawerToggle();
          generate();
          const searchForm = document.getElementById('search');
          searchForm.addEventListener('submit', onSearchSubmit);
          const resetBtn = document.querySelector('studs-button[type="reset"]');
          resetBtn.addEventListener('click', onReset);
          const checkboxGroup = document.querySelector('studs-checkbox-group[name="letters"]');
          checkboxGroup.addEventListener('change', onFilterLetterChange);
        });
      </script>
    `;
  }
};
