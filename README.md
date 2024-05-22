# 🥓 https://backmarket.github.io/backcon/

This is the website for the backcon event. It is a 1-day internal conference open for all the BOT members.
This will happen in Bordeaux on Tuesday, June, 18th.

📅 Save the date!

## How to update the content?

If you want to update a talk or a speaker, read [public/README.md](public/README.md)
Run `npm run build`

## How does it work?

There are three scripts:

- `npm run build`: run `build-homepage`, `build-speakers` and `build-talks`
- `npm run build-homepage`: build [public/index.html](public/index.html)
- `npm run build-speakers`: build every speakers `public/speakers/*/index.html`
- `npm run build-talks`: build every speakers `public/talks/*/index.html`

## How to update the templates?

The templates are located in the [src/templates](src/templates) folder.
You can update it the way you would update an html file.

### Use a variable

To use a variable in a template, use `{{ myVariable }}`

#### Built-in variables

- `item-name`: the name of the folder containing the talk or the speaker.
- `item-path`: the path to the talk or the speaker.

#### Custom variables

If you want to create custom variables, you wan create it:

- either as a key of the `index.json` of your ressource folder for basic types

```json
{ "myVariable": "Example" }
```

- or as the name of a markdown file in the resource folder `myVariable.md`

If you want to add a variable named `myVariable`, use `{{ myVariable }}` in the template.
It'll be interpreted on the built html in the resource folder.

For example, you can use `{{ name }}` and `{{ description }}` on the `speaker.html` template if you have the following structure:

- `public/speakers/jean-jacques/index.json` containing `"name": "Example"`
- `public/speakers/jean-jacques/description` containing your markdown

after running `npm run build`, you'll `public/speakers/jean-jacques/index.html` will update with your variables

### Loop over talks or speakers

You can add the `for-each-something` attribute in any html element:

```html
<article for-each-talks>
  <h3>{{ talks.title }}</h3>

  <div for-each-talks.speakers>
    <a href="../{{ speakers.item-path }}">
      <img
        height="32"
        width="32"
        alt="{{ speakers.displayName }}"
        src="../{{ speakers.item-path }}/avatar.jpg"
      />
    </a>
  </div>

  <div>
    <span>{{ talks.time }}</span>
    <span>{{ talks.location }}</span>
  </div>

  <p>{{ talks.description }}</p>

  <a href="../{{ talks.item-path }}">Link to the talk</a>
</article>
```

/!\ It's limited to speakers & talks in homepage + speakers on talks page for now.

## Analytics

Here is the dashboard made from the data collected on the website: https://app.eu.amplitude.com/analytics/backmarket/dashboard/e-5wzsfifg
