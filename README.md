# BQ-AutoComplete
BqAutoComplete is an open source library for autocomplete, released under the MIT License: http://www.opensource.org/licenses/mit-license.php

The idea behind Bq-AutoComplete is that this is the only javascript single-select dropdown / autocomplete you should ever need, for 1 to 10,000 items.
Features at a glance: autocomplete or dropdown by category or all items. Grid in the dropdown, unlimited nesting levels, supports logial operators & | and !.
Can modify to support left search on some fields and contains search on other fields.
Fast, easy to populate, and easy to extend the functionality.

Demo
====

Javascript demo at http://www.methodicalmiracles.com/Bq-AutoComplete/index.html
This is also compatible with Angular JS. Demo at http://www.methodicalmiracles.com/Bq-AutoComplete-AngJS/listbox.html

Specs and Compatibility
=======================

Size: 87K + 704K for example data
Tested with Chrome, Edge, Internet Explorer, Firefox, and Opera,
 
It works fine on Android and IPhone except that they intercept the double-click event for listing all. You can work around that by typing "*" instead though.

Security issues: Fortunately this does not use any jquery, eval, CORS, or cookies. However, it uses innerHtml in bq-auto-complete.min.js in two places.

The data in here is all public domain; the 2017 NAICS data is from the U.S. government.

It does not use any third-party code, besides being adapted from Pixabay.

Released under the MIT License: http://www.opensource.org/licenses/mit-license.php

It has no dependencies and does not use any third-party code, besides being adapted from Pixabay: https://github.com/Pixabay/JavaScript-autoComplete v.1.0.4 (2016-02-10).
I looked at adapting from some other controls instead, but Pixabay seemed to have the best public domain one to me to use as a starting point.
While Pixabay can only have one autocomplete control per page, I worked around this limitation by copying the control, as shown in the sample app.

Features
========

It works well well and fast when a query returns only a small number of items for the dropdown, 
and the same control still works well and with only a 2 1/2 second lag when the query returns up to 10,000 for the dropdown. 
When there are thousands of items, often a user will want to orgnaize them in a hierarchy with nesting. 
It turns into a readonly control when there is only one item for the dropdown.

If you have multiple BqAutoCompletes on the same page, they call can use the same bq-matcher.js and bq-auto-complete.min.js files.
However, each one needs its own bqac?-auto-complete.js in order for the developer to customize the grid as they wish to meet their needs.
Should you need a bqac7... or higher bqautocomplete, simply copy bqac2-auto-complete.js and change every occurrence of 'bqac2' to 'bqac7'.
Also, don't forget to change the datasource from 'acc2' to whatever you want it to be.
On the input lists, just use the symbols as they appear; in other words, use '&', not '&amp;'

bq-matcher.js currently it does a left search on the first item in the grid, a contains search on the second item in the grid plus any non-displayed keywords plus the first level parent.
So for example, say Houston is in Texas, which is in the United States. Searching on "Tex" (not case sensitive) returns "Texas", "Houston", and other Texas cities.
Searching on "Uni" returns "United States", "Texas", but not every single city in the United states.
This behavior can be changed to include all parents by uncommenting the code in bqac.js.
It you want different behavior it should be easy to make your own custom bq-matcher.js file.

Author: Steven Michael Morrison
For suggestions contact me at smorrison4@aol.com

