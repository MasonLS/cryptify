# Cryptify
Hash your favorite tracks into high-strength personal passwords based on their musical qualities.

## Security Issues
The main issue is I'm not an expert on web security. The way it works now, Cryptify hashes a combination of the track's pitch information as Spotify's Web API provides it and a user's provided reason for liking it, using the sha256 hashing algorithm, and salts this hash with (dun-dun-dun-dun!) the user's Spotify ID.

If this were to become more than just a concept app, besides doing something more cryptographically sophisticated in terms of its algorithm, it would probably need to encrypt, store, and retrieve user-specific information, such as a unique salt, which would itself need to be safeguarded from potentially devastating attack. Essentially, a user would need to identify themselves with Cryptify (and not just Spotify) via a regular-old, non-sonic password - one that would be protecting all of their others!

But perhaps that's not true. Perhaps there is a way around Cryptify, or a service like it, assuming the daunting mantle of central password bank. Personally, I find the idea of utilizing media other, and perhaps more memorable than, text for encryption purposes compelling enough to be worth pursuing. I would enjoy discussing the concept with developers who might know more about security.
