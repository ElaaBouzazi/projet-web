from flask import Flask, request, jsonify
from firebase_admin import credentials, firestore, initialize_app

app = Flask(__name__)

# Initialiser Firebase
cred = credentials.Certificate("path/to/your/firebase/credentials.json")
initialize_app(cred)

db = firestore.client()

# Route pour ajouter un produit
@app.route('/add_product', methods=['POST'])
def add_product():
    data = request.get_json()

    try:
        product = {
            "name": data['name'],
            "description": data['description'],
            "price": data['price'],
            "category": data['category'],
            "imageUrl": data['imageUrl'],
            "stock": data['stock'],
            "addedBy": data['addedBy']
        }

        # Ajouter le produit à la collection "products"
        db.collection("products").add(product)

        return jsonify({"message": "Produit ajouté avec succès!"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
