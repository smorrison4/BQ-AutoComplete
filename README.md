# BQ-AutoComplete
BqAutoComplete is an open source library for automcomplate, released under the MIT License: http://www.opensource.org/licenses/mit-license.php

The idea behind Bq-AutoComplete is that this is the only javascript single-select dropdown / autocomplete you should ever need. for 1 to 10,000 or so items.

Demo
====

Javascript demo at http://www.methodicalmiracles.com/Bq-AutoComplete/index.html

Specs and Compatibility
=======================

Size: 87K + 704K for example data
Tested with Chrome, Edge, and Internet Explorer. There is a problem with Firefox.

It does not use any third-party code, besides being adapted from Pixabay.

It works on Android except that Android intercepts the double-click event. You can work around that by typing "*" instead though.

It works on IPhone except that the down arrow does not work. You can work around that by typing ":" to get the categories, and "*" to list all.

Security issues: Fortunately this does not use any jquery or eval. However, it uses innerHtml in bq-auto-complete.min.js in two places.

The data in here is all public domain; the 2017 Naics are from the U.S. government.

The button styles are my own; feel free to use them.

Released under the MIT License: http://www.opensource.org/licenses/mit-license.php

It has no dependencies and does not use any third-party code, besides being adapted from Pixabay.
https://github.com/Pixabay/JavaScript-autoComplete v.1.0.4 (2016-02-10) is an extremely lightweight and powerful vanilla JavaScript completion suggester.
I looked at adapting from some other controls instead, but Pixabay seemed to have the best public domain one to me to use as a starting point.
While Pixabay can only have one autocomplete control per page, I worked around this limitation by copying the control, as shown in the sample app.

Features
========

It works well well and fast when a query returns only a small number of items for the dropdown, 
and the same control still works well and with only a 2 1/2 second lag when the query returns up to 10,000 for the dropdown. 
When there are thousands of items, often a user will want to orgnaize them in a hierarchy with nesting. 
It turns into a readonly control when there is only one item for the dropdown.

If you have multiple BqAutoCompletes on the same page, they call can use the same bq-matcher.js and bq-auto-complete.min.js files.
However, each one needs its own bq?-auto-complete.js in order for the developer to customize the grid as they wish to meet their needs.
Should you need a bq7... or higher bqautocomplete, simply copy bq2-auto-complete.js and change every occurrence of 'bq2' to 'bq7'.
Also, don't forget to change the datasource from 'acc2' to whatever you want it to be.
On the input lists, just use the symobls as they appear; in other words, use '&', not '&amp;'

bq-matcher.js currently it does a left search on the first item in the grid, a contains search on the second item in the grid plus any non-displayed keywords plus the first level parent.
So for example, say Houston is in Texas, which is in the United States. Searching on "Tex" (not case sensitive) returns "Texas", "Houston", and other Texas cities.
Searching on "Uni" returns "United States", "Texas", but not every single city in the United states.
This behavior can be changed to include all parents by uncommenting the code in bqac.js.
It you want different behavior it should be easy to make your own custom bq-matcher.js file.

Author: Steven Michael Morrison, Ph.D.
For suggestions contact me at smorrison4@aol.com

