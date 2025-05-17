import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

interface Category {
  name: string;
}

interface ItemProduct {
  id: number,
  image: string,
  name: string,
  slug: string,
};

interface Product {
  id: number,
  images:  Array<string>,
  category: ItemProduct,
  description: string,
  price: string,
  slug: string,
  title: string,
}

interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  product: Product | null;
}

const { width: screenWidth } = Dimensions.get('window');

const ProductModal: React.FC<ProductModalProps> = ({ visible, onClose, product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  if (!visible || !product) return null;

  const images = product.images || [];

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={{ fontSize: 18 }}>✕</Text>
          </TouchableOpacity>

          <View style={styles.imageContainer}>
            {images.length > 0 ? (
              <Image
                source={{ uri: images[currentImageIndex] }}
                style={styles.image}
                resizeMode="cover"
              />
            ) : (
              <Text>No Image</Text>
            )}

            {images.length > 1 && (
              <>
                <TouchableOpacity style={styles.leftArrow} onPress={prevImage}>
                  <Text style={styles.arrowText}>←</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.rightArrow} onPress={nextImage}>
                  <Text style={styles.arrowText}>→</Text>
                </TouchableOpacity>
              </>
            )}
          </View>

          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.description}>{product.description}</Text>
          <Text style={styles.price}>${product.price}</Text>
          <Text style={styles.category}>Category: {product.category?.name}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default ProductModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 8,
    zIndex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  leftArrow: {
    position: 'absolute',
    left: 10,
    top: '45%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 8,
    borderRadius: 20,
  },
  rightArrow: {
    position: 'absolute',
    right: 10,
    top: '45%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 8,
    borderRadius: 20,
  },
  arrowText: {
    color: 'white',
    fontSize: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  description: {
    marginTop: 4,
    color: '#555',
  },
  price: {
    marginTop: 6,
    fontWeight: 'bold',
    color: 'red',
  },
  category: {
    marginTop: 4,
    fontSize: 12,
    color: '#666',
  },
});
