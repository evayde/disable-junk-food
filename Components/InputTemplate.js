import {html, render} from 'lit-html';
let foodIngredient = [{
    title: "Rice", used: true},
    {title: "chicken", used: true},
    {title: "lentil", used: false}
];
let app = () => html`
    <section class="disableJunkFoodapp">
        <header class"header">
            <h1>foods</h1>
        </header>

        <section class="main">
            <ul class="food-list">
            </ul>
        </section>
    </section>

`;

render(app(), document.body)