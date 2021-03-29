# Table of Contents

* [Post-Assignment Thoughts](#post-assignment-thoughts)
* [Setup](#setup)


# Post-Assignment Thoughts

This was a fun assignment. I tried not to be a perfectionist with this because I didn't want to spend too much time than I needed to, but looking back I would have loved to add a few things to improve the performance and experience. Some ideas:

- Sub-breeds was a later addition, but React Router woud have been great for it. Also users could hit the back button rather than having to tap the nav bar to go back. Users could go to a URL directly to view sub-breeds. The route name would determine what major breed is selected rather than needing to hold that state in `App` with `selectedBreed`.
- I used `axios-cache-adapter` to cache the responses from the Dog Data API, but it would have been good to cache the images for a short time as well. Loading all of those images makes the app less performant. I included `loading="lazy"` on each `img` tag at least.
- Redo the `dogBreeds` data structure

  - I redid the central dog data strucure a couple times and settled on the current one (below).

    ```json
    [
      {
        "breed": "schnauzer",
        "subBreeds": [
          "giant",
          "miniature"
        ]
      },
      {
        "breed": "hound",
        "subBreeds": [
          "afghan",
          "blood",
          "ibhizan"
        ]
      }
    ]
    ```

    Filtering data using `filterBreedList` was a little strange because for sub-breeds, you could just compare each element directly to see if it contained the filter query, but if filtering for just the main dog breeds, you'd need to access the `.breed` property on elements to get the name. And the only way to tell which one to use was to pass along the selected major dog breed name to tell that you're filtering through sub-breeds. But if I could go back, I would organize it to the one below.

    ```json
    {
      "breed": ["shepherd"],
      "hound": ["afghan", "blood", "ibhizan"]
    }
    ```
    This would be good because the filtering function wouldn't need to differentiate between types of lists, and you could just pass in the proper list depending on whether there is a breed selected by the user. Also, you wouldn't need to keep track of the index of the array in state with `selectedBreedI`.
- Break out Bulma UI components into separate React components. The `react-bulma-components` library is great, but I found I needed to use just the normal HTML elements with Bulma classes at times for my own usage.
- I was happy with my `[breed:sub-breed]: img-url` system for the dog images as I didn't want to stuff the URLS and the sub-breeds -> major breeds all together in one structure, and it made for faster image URL retrieval. But perhaps adding a couple of helper functions to `/lib` for this purpose would help clean up the code.

But yeah. Dogs are pretty dang good.

![Chihuahua attacks camera and leads us all to Skyrim](https://media3.giphy.com/media/Qu7RaOmmlyvkrnPCm9/giphy.gif)

# Setup

To start the app, in the project directory, run

```
npm install && npm start
```

or with yarn,

```
yarn && yarn start
```

and view it in [`http://localhost:3000`](http://localhost:3000).

Enjoy!
