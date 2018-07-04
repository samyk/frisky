# frisky

Instruments to assist in binary application reversing, geared towards walled gardens like iOS, (currently) using Frida.

- [frida-url-interceptor.js]() - Intercepts all URLs of an iOS/macOS application, allowing you to trace and alter network flow (*requested by user on irc*)
  - e.g., to sniff/intercept all http(s) calls from Safari:
  - `frida -U -n Safari -l frida-url-interceptor.js`
 


## Contact

Shaped by [@SamyKamkar](https://twitter.com/samykamkar) / [https://samy.pl](samy.pl)
