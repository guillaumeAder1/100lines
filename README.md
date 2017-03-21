### 100 Lines or Less Developer Challenge!

<img src="https://github.com/maplabs/100lines/blob/master/images/topBanner.jpg?raw=true">

## Rules
1. Maximum of 100 Lines of beautified JavaScript code. (Your CSS and HTML code can be as long as you want).
2. Maximum of 100 characters per line.
3. Using Esri's ArcGIS API for JavaScript.
4. Each project must contain an index.html file and a seperate js file.(see example).
5. Data must be publically accessible.
6. Applications must be freely distributable via apache 2.0 license.
7. Applicants must be 18+ and be living in the UK.
8. Able to attend the [Esri UK Annual Conference](http://www.esriuk.com/events/ac17) on the 16th May 2017.
##### By submitting your application you're agreeing to the terms and conditions. Full list of which can be found [here](https://github.com/maplabs/100lines/Terms%20and%20Conditions%20Agreement.md).


## Verification
To verify the code is 100 lines or less we are using [this](http://www.danstools.com/javascript-beautify/) beautifier. We recommend you use this as you go along to test your code.
Using the following settings.
Indent with a tab character.
Remove all extra new lines.
Wrap lines to near 110 character (Although remember only 100 characters per line.)
Braces with control statement.

## Contest Period
- Starts: 17:00 GMT Tuesday 21th March 2017
- Closes: 24:00 GMT Sunday 23rd April, 2017 (No entries will be accepted after this time.) 

You will be contacted via email by 28th of April if you've been shortlisted, see note section below.

The winners will be announced at the Esri UK Annual Conference 16th May 2017.

## How to Enter
1. Fork and then clone this repo.
2. Add a sub-folder with your app in it (see [example](basemaptour)).
3. Make a pull request on the **master** branch to submit your entry. 
#### This request represents your agreement to the [Terms and Conditions](https://github.com/maplabs/100lines/Terms%20and%20Conditions%20Agreement.md).

NOTE: 
* Be sure to Pull and Merge from this repo to get the latest before making your pull request!  We'll publish the app for you.
* If you don't have a public email on your github account, can you please either email me or leave your email as a comment in the code. Otherwise we cannot contact you!

## What can I win?
* Registration, Flights and accommodation to the Esri European Developer Summit in Berlin (24th - 26th October)
* iPad 2 Air 32GB
* £100 Amazon voucher

## Judging Criteria

1. Effective use of the ArcGIS API for JavaScript
2. UX and UI
3. Coding style
4. Responsive design
5. The concept or idea

## Example Entry

Follow the structure of [this](submissions/SampleSubmission) example.  View it live [here](https://github.com/maplabs/100lines/submissions/SampleSubmission/index.html).


```
\project\
\project\index.html
\project\js\main.js
\project\css\style.css
\project\images\
```

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no">
  <title>SampleSubmission</title>

  <link rel="stylesheet" href="https://js.arcgis.com/4.3/esri/css/main.css">
  <link rel="stylesheet" href="css/style.css">
  
  <script src="https://js.arcgis.com/4.3/"></script>
  <script src="js/main.js"></script>

</head>

<body>
  <div id="viewDiv"></div>
  <div id="info">
    <span id="name"></span><br>
    <span id="category"></span><br>
    <span id="wind"></span>
  </div>
</body>

</html>
```

Any questions or queries please feel free to email
smcgee@esriuk.com

Good luck!


## Resources

* [Esri UK Annual Conference](http://www.esriuk.com/events/ac17)
* [ArcGIS API for JavaScript](https://developers.arcgis.com/en/javascript/index.html)
* [ArcGIS Blog](http://blogs.esri.com/esri/arcgis/)
* [@esriukgeodev](http://twitter.com/esridevsummit) Esri UK's developer twitter account
* [@esriuk](http://twitter.com/esridevsummit) Esri UK's main twitter account

## Licensing
Copyright 2017 Esri UK

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.


A copy of the license is available in the repository's [license.txt](https://github.com/maplabs/100lines/license.txt) file.
[](Esri Tags: ArcGIS Web Mapping Contest 100-lines-or-less Code-Challenge Responsive Mobile)
[](Esri Language: JavaScript)
