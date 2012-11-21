#!/usr/bin/env python
from distutils.core import setup
import os
import sys


appname = 'grappelli_modeltranslation'
version = __import__(appname).__version__


if sys.argv[-1] == 'publish':
    os.system("python setup.py sdist upload")
    print "You probably want to also tag the version now:"
    print "  git tag -a %s -m 'version %s'" % (version, version)
    print "  git push --tags"
    sys.exit()

setup(
    name='grappelli-modeltranslation',
    version=version,
    description="A small compatibility layer between grappelli and " \
                "django-modeltranslation",
    author='Jacob Magnusson',
    author_email='m@jacobian.se',
    url='https://github.com/jmagnusson/grappelli-modeltranslation',
    license='New BSD License',
    platforms=['any'],
    packages=[appname],
    package_data={appname: ['static/{0}/*/*'.format(appname)]},
    classifiers=[
        'Development Status :: 3 - Alpha',
        'Environment :: Web Environment',
        'Framework :: Django',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: BSD License',
        'Operating System :: OS Independent',
        'Programming Language :: Python',
    ],
)
