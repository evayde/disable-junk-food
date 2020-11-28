import {html, render} from 'lit-html';
let foodIngredients = [{
    title: "Rice", used: true},
    {title: "chicken", used: true},
    {title: "lentil", used: false}
];

let handleAddfood = (e) => {
    if (e.key !== 'Enter') return;
    foodIngredients.push({
        title: e.target.value,
        completed: false
    });
    e.target.value = '';
    update();
}

let addFood = () => html`
    <input class="newfood" placeholder = "add new food" autofocus=" " @keyup="${handleAddfood}" />
`;

let viewFoods = (foodIngredient) => html`
    <li>
        <div class="view">
            <input class="toggle" type="checkbox" />
            <label>${foodIngredient.title}</label>
        </div>
    </li>    
`;


let app = () => html`
    <section class="disableJunkFoodapp">
        <header class"header">
            <h1>foods</h1>
            ${addFood()}
        </header>

        <section class="main">
            <ul class="food-list">
                ${foodIngredients.map((foodIngredient) => viewFoods(foodIngredient))}
            </ul>
        </section>
    </section>

`;

let update = () => render(app(), document.body);
update();