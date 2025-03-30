echo "Checking out to main branch..."
git chekout main

echo "Building app..."
npm run build

echo "Deploying files to server..."
scp -r dist/* root@79.163.243.175:/var/www/79.163.243.175/

echo "Done"