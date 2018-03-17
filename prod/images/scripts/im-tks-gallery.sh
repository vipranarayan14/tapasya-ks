# enable glob extended to support 'or' (|) in glob.
shopt -s extglob;

# make folders to contain previews and slides.
mkdir -p {preview,slide};

for f in `find . -name *.+(jpg|JPG)`; do

  filename=$(basename "$f");
  filename="${filename%.*}";
  
  convert $f -strip -quality 50 -resize '900x600>' miff:- \
  | composite -gravity east -geometry +0+10 ../tks-watermark.png miff:- slide/$filename-slide.jpg
  
    convert $f -strip -quality 50 -resize '300x200>' preview/$filename-preview.jpg
    
    echo "processed $f";
    
done;

