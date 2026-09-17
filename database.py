import os
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure

class MongoDB:
    _instance = None
    _client = None
    _db = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(MongoDB, cls).__new__(cls)
            cls._instance._connect()
        return cls._instance

    def _connect(self):
        # We reuse the same MongoClient instance. This solves the "creating a new connection on every request" problem.
        mongo_uri = os.environ.get('MONGO_URI', 'mongodb://localhost:27017/')
        db_name = os.environ.get('MONGO_DB_NAME', 'my_fast_db')
        
        try:
            print("Initializing MongoDB connection...")
            self._client = MongoClient(mongo_uri, serverSelectionTimeoutMS=5000)
            self._db = self._client[db_name]
            # Verify connection
            self._client.admin.command('ping')
            print("Successfully connected to MongoDB!")
            
            # Setup Indexes to prevent slow queries (e.g. index on email for fast lookups)
            self._setup_indexes()
        except ConnectionFailure as e:
            print(f"Failed to connect to MongoDB: {e}")

    def _setup_indexes(self):
        # Example: Indexing 'email' field in 'users' collection to avoid full collection scans
        self._db.users.create_index("email", unique=True)
        print("Database indexes ensured.")

    def get_db(self):
        return self._db

# Singleton getter
def get_db():
    return MongoDB().get_db()

