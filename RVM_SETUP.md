Working with RVM and SproutCore
===============================
Step by step instructions for getting up and running with `rvm` and SproutCore.

If not already, install RVM.  If you are a Windows user, and have not already done so, please switch to Mac.

    > brew install rvm

Use a stable version of Ruby (note 2.1.0 not available for rvm yet).

    > rvm install 1.9.3-p484

Tell the system what Ruby to use in the current environment.

    > rvm use 1.9.3-p484
    Using /YOUR/PATH/TO/.rvm/gems/ruby-1.9.3-p484

And just to verify again...

    > ruby --version
    ruby 1.9.3p484 (2013-11-22 revision 43786) [BLAH BLAH PLATFORM INFO]

Create a Gemset to encapsulate your project's dependencies.

    > rvm gemset create sc-1_10_2

Set the current environment to use this Gemset as an install/source target.

    > rvm 1.9.3-p484@sc-1_10_2
    'sc-1_10_2' gemset created (/Users/rlune/.rvm/gems/ruby-1.9.3-p484@sc-1_92).

Install SproutCore, version 1.10.2

    > gem install sproutcore --version 1.10.2

After lots of time compiling, shuffling, etc. take a look at what's there when the install wraps up.

    > gem list

    *** LOCAL GEMS ***

    addressable (2.3.5)
    chunky_png (1.2.9)
    compass (0.12.2)
    cookiejar (0.3.0)
    daemons (1.1.9)
    em-http-request (1.1.2)
    em-socksify (0.3.0)
    erubis (2.7.0)
    eventmachine (1.0.3)
    extlib (0.9.16)
    fssm (0.2.10)
    haml (3.1.8)
    http_parser.rb (0.6.0)
    json_pure (1.8.1)
    rack (1.5.2)
    rake (0.8.7)
    sass (3.2.13)
    sproutcore (1.10.0)
    thin (1.6.1)
    thor (0.18.1)

##Using the `.rvmrc` file
You can add an `.rvmrc` file to your project directory so that whenever you `cd` to that directory your `rvm` environment will automatically be set up.

For example, if you're working on multiple projects that require different Ruby or RubyGem versions, all you need to do is add an `.rvmrc` file to each of the different project directories, a file which contains one line like so:

	rvm --create use 1.9.3-p484@sc-1_10_2

This line tells `rvm` to use the 1.9.3-p484 Ruby installation you installed earlier and the gemset bundled under the label sc-1_10_2.

Now when you start the SproutCore server using `sc-server` in that directory the appropriate Ruby and gemset version will automatically be involved.  Easy.

##Conclusion
Ruby version management utilities like `rvm` are essential to reducing headaches where multiple projects may require varying Ruby and/or gemset versions.