Your photographs live in this folder:  photos/

Every file in photos/ is a web-optimised copy, 1600px on the long edge,
JPEG quality 66. Total weight: about 12MB for 27 images.

The full-resolution originals were moved OUT of the site folder to:

    ../artistic photos/      (workspace root, outside site/)
    ../landscape photos/

That matters: Cloudflare Pages uploads everything in the site folder, and the
originals are 210MB. Keep them out.

---

ADDING A NEW PHOTOGRAPH

1. Resize it first. Either:
   - use sips in Terminal:
       sips -Z 1600 -s format jpeg -s formatOptions 66 in.jpg --out out.jpg
   - or export from Lightroom/Photoshop at 1600px long edge, JPEG, quality ~70, sRGB
2. Save it into photos/
3. Add an entry to the `photos` array in assets/js/data.js, with `ar` set to the
   real pixel dimensions: "1280 / 1600"

Naming convention already in use:  series-description.jpg
    landscape-h39a0377.jpg     <- was "landscape photos/H39A0377.jpg"
    artistic-frame-13.jpg      <- was "artistic photos/Frame 13.jpg"

Keep filenames lowercase with hyphens. No spaces.
