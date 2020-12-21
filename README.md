# What is this?
A website that my spring boot server will serve locally to my browser. As of right now I have
no plans to host my server publicly.

# How does the website work?
The Evan Language Website will support several functions for allowing a user to define and expand their vocabulary in a language.

# 1.
The user may expand their known vocabulary by adding words and their definitions to the locally hosted database via the served
website.

# 2.
The user may also expand their knowledge of known symbols (such as kanji) by adding those symbols along with their words and definitions
when saving to the database. Both main symbols (such as kanji) and ancillary symbols (such as katakana or hiragana readings) are supported.

# 3.
The user may then use the website to generate tests to help solidify their knowledge of the language, as well as preventing regression in
knowledge from past entries.

# 4.
The user may specify source-based tests to allow them to prepare to re-read material. Only vocabulary or symbols from the specified
source will appear in a source based test.

# How is this different than a dictionary?
This is like a dictionary, except it does not initially contain any words. Instead the user must go out and find words/definitions/symbols
they wish to add their dictionary. In this way, it is a personal dictionary, and it helps the user grow their knowledge without
overwhelming them with new and unfamiliar vocabulary.

Ideally the user will be able to grow what they lmpw to encompass most of the language they need to use, by inserting those words
into the database and testing on them, as they come across them.

# What does this have to do with regression testing?
Some of the projects related to this on github mention regression testing. I admit this may be a bit confusing. No regression testing
is involved in the sense of programming related regression testing (at-least nothing the user has to worry about). The idea here is
that the user is able to run regression tests on their own learned vocabulary (I just liked the analogy).
