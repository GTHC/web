echo "🐳 Checking if Docker is set up 🐳"

isCommand docker || ( printf "Docker does not seem to be installed. Install at: \nhttps://docs.docker.com/install/ \n" && exit )

docker=$(docker ps )
if [[ !($docker =~ .*kville-scheduler_app.*) && !($docker =~ .*kville-scheduler_db.*) ]]
then
  echo "📦 Building containers 📦"
  docker-compose up -d
  echo "💾 Setting up database 💾"
  docker-compose run app ./bin/db-setup.sh
fi
