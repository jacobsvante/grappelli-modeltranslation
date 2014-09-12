# grappelli-modeltranslation
[![PyPI version](https://pypip.in/v/grappelli-modeltranslation/badge.png)](https://pypi.python.org/pypi/grappelli-modeltranslation)

**A small compatibility layer between django-grappelli and django-modeltranslation.**

**Author:** Jacob Magnusson. [Follow me on Twitter][twitter]

# Overview

grappelli-modeltranslation is a small compatibility layer between [django-grappelli] and [django-modeltranslation]. See 

# Requirements

* Python 2.6+
* Django 1.4+
* [django-grappelli] 2.4.0+
* [django-modeltranslation] 0.4.0+

# Installation

Install using `pip`...

    pip install grappelli-modeltranslation

...or clone the project from github.

    git clone git@github.com:jmagnusson/grappelli-modeltranslation.git
    pip install -r requirements.txt

Add package to `INSTALLED_APPS`:

    INSTALLED_APPS = (
        'grappelli',
        'grappelli_modeltranslation',
        ...
        'modeltranslation',
    )

NOTE: `grappelli_modeltranslation` must come before `modeltranslation` for tabbed translation fields to work

Copy the static files to your project:

    python manage.py collectstatic


# Documentation

[docs]

# Changelog

## 0.1.1

**Date**: Nov 13, 2012

* Support both the new ("mt") and old ("modeltranslation") html class names

## 0.1.0

**Date**: Nov 11, 2012

* Initial version

# License

Copyright (c) 2012 Jacob Magnusson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.


# Credits

[django-grappelli] for making the Django admin usable
[django-modeltranslation] for the tabbed interface
[grappellifit] for the initial idea


[twitter]: https://twitter.com/jacobsvante_
[docs]: https://github.com/jmagnusson/grappelli-modeltranslation
[django-modeltranslation]: https://github.com/deschler/django-modeltranslation
[django-grappelli]: https://github.com/sehmaschine/django-grappelli
[grappellifit]: https://github.com/h3/grappelli-fit
