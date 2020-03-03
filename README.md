## `BreweryDB sample project`

In order to start, per usual first run "npm -i" to install all dependables and then run the app with "npm start".

### `Decision making`

When starting the app for the first time, it will load all available beer data once and store it locally.

This is necessary so that beers can be filtered by location, as the API itself does not feature such a search parameter. While this certainly wouldn't be feasible for the production API, with only around 1000 beers available in the Sandbox, this will do.

I am aware that by building a small nodejs server the download of the data could be done in the background and wouldn't cause a few seconds of waiting time when opening the app the first time, but for the sake of ease of use and transparency about the inner workings of the app I chose to build it in its current iteration.

Beers can be filtered seperately by name, type and location.

Breweries themselves can also be filtered by location. As the list is rather short, a filter by name did not seem necessary.

When clicking a beer / brewery in the list, the app will then present more information about the clicked item, with breweries containing links to the produced beers and vice versa.

Lodash was used in places it seemed logical to use (flattening arrays, filtering objects by unique values).
