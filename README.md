# Compare Images
It takes two folders, *base* and *current* full of wonderful images with same **names** and ganarates a **diff** folder in given destination folder with the same **names**. Also, it generates a **JSON** blob with the comparison info and a *neat* web app to navigate through this image files. This uses [jimp](https://github.com/oliver-moran/jimp) to compare the images which uses an awesome library [pixelmatch](https://github.com/mapbox/pixelmatch).

To install...
```
npm install compare-images

(or)

yarn add compare-images
```

Usage...

```
Image comparison utility

  It takes two folders, base and current full of images with same names and     
  ganarates a diff folder in given destination location with the same names.    
  Also, it generates a JSON blob and a neat web app to navigate through this    
  image files. It uses jimp npm module to compare the images.                   

Synopsis

  $ compare-images --baseDir ./base --currentDir ./current --destDir ./diff     
  [--reportFileName "results.json"]                                             
  $ compare-images --help                                                       

Options

  -b, --baseDir folder        Baseline images folder used for comparison. Should be flat list of image      
                              files. Can contain a thumbnail folder with same image names.                  
  -c, --currentDir folder     Current images folder used for comparison. Should be flat list of image       
                              files. Can contain a thumbnail folder with same image names.                  
  -d, --destDir folder        Destination folder to same all the diff images. Utility will overwrite any    
                              existing files in this locaiton.                                              
  -t, --threshold number      (Optional) Defaults to 0.1. Ranges 0-1.                                       
  --reportFileName filename   (Optional) Defaults to report.json.                                           
  -h, --help                  Print usage                                                                   

```


## Roadmap

* Refactor UI navbar
* Fix image viewer issues
* Add zoom option to image viewer
* Provider a filer server to upload and to manage multiple versions - Requires a lot of effort so might not be coming soon.