# frisky

Instruments to assist in binary application reversing and augmentation, geared towards walled gardens like iOS, using Frida and other tools.

- [frida-url-interceptor.js](frida-url-interceptor.js) - Intercepts all URLs of an iOS/macOS application, allowing you to trace and alter network flow (*requested by user on irc*)
  - e.g., to sniff/intercept all http(s) calls from Safari:
  - macOS: `frida -U -n Safari -l frida-url-interceptor.js`
- [ldid / ldid2](https://github.com/samyk/ldid) - When building recent iOS jailbreaks dependent on SHA256 signatures, `ldid2` is required. This repo will allow you to easily compile `ldid` and `ldid2` for signing and modifying an iOS binary's entitlements, and thus jailbreaking a device.
  - macOS: `ldid{2} -e MobileSafari` # to dump MobileSafari's entitlements
  - macOS: `ldid{2} -S cat` # to sign cat
- sniff network traffic from (non-jailbroken) iOS device from your mac:
  - macOS: ```system_profiler SPUSBDataType|perl -n0e'`rvictl -s $1`if/iP(?:hone|ad):.*?Serial Number: (\S+)/s';sudo tcpdump -i rvi0```
  - standard tcpdump options/filters apply
- Electra: allow jailbroken Tweaks to appear in Settings:
  - iOS: `mv /Library/TweakInject /Library/TweakInject.bak && ln -s /Library/MobileSubstrate/DynamicLibraries /Library/TweakInject && killall -HUP SpringBoard`
- Decrypt IPA (iOS apps)/Frameworks for static analysis via [dumpdecrypted.dylib](https://github.com/conradev/dumpdecrypted):
  - iOS: `su mobile && mkdir ~/tmp && cd ~/tmp && DYLD_INSERT_LIBRARIES=/usr/lib/dumpdecrypted.dylib /var/containers/Bundle/Application/*/AppName.app/AppName`

## Contact

Shaped by [@SamyKamkar](https://twitter.com/samykamkar) / [https://samy.pl](https://samy.pl)
