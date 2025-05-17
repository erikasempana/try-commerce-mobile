import ProductModal from '@/components/ui/ProductModal';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';


type ItemProduct = {
  id: number,
  image: string,
  name: string,
  slug: string,
};

type ProductsList = {
  id: number,
  images:  Array<string>,
  category: ItemProduct,
  description: string,
  price: string,
  slug: string,
  title: string,
};
const setDropDownValue = (categories: { id: number; name: string }[]) => {
  return categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));
};

export default function HomeScreen() {
  const [products, setProducts] = useState<ProductsList[]>([]);
  const [categories, setCategories] = useState([]);
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductsList | null>(null);
  const [limit, setLimit] = useState(6);
  const [open, setOpen] = useState(false);


  async function getProduct(categoryId: number | null, currentLimit: number){
    try {
      let  url = `https://api.escuelajs.co/api/v1/products?limit=${currentLimit}&offset=0`;
      if (categoryId) {
        url = `https://api.escuelajs.co/api/v1/categories/${categoryId}/products?limit=${currentLimit}&offset=0`;
      } else {
        url = `https://api.escuelajs.co/api/v1/products?limit=${currentLimit}&offset=0`;
      }
      const response = await fetch(url);
      const result = await response.json();
      setProducts(result);
      return 'Success get products';
    } catch (error) {
      return error;
    }
  }

  const renderProducts = (item: ProductsList): React.ReactElement => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => handleProductPress(item.id)}>
        <View style={{width: '100%', height: 125, alignItems: 'center', justifyContent: 'center'}}>
          <Image source={item.images.length >= 0 ? { uri: item.images[0] } : require('../../assets/images/default.png')}  width={185} height={125} alt='product' style={{ width: 185, height: 130, borderRadius: 10, resizeMode: 'cover', padding: 3, objectFit: 'cover'}}  />
        </View>
      <Text style={{flex: 1, padding: 4, textAlign: 'center'}}>{item.title}</Text>
      <Text style={{flex: 1, padding: 4, color:'red', textAlign: 'center', fontWeight: 700 }}>{'$ '+ item.price}</Text>
      <Text style={{flex: 1, padding: 4, textAlign: 'left'}}>category: {item.category.name}</Text>
      </TouchableOpacity>
    </View>
  );
  
  
   const handleProductPress = async (id:number) => {
    try {
      const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
      const result = await response.json();
      setSelectedProduct(result);
      setShowModal(true);
      console.log('Success get product by id');
    } catch (error) {
      console.log(`Error get product by id: ${error}`);
    }
  };

  async function getCategories() {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/categories');
      const result = await response.json();
      setCategories(result);
      console.log('Success get Categories');
    } catch (error) {
      console.log(`Error get Categories: ${error}`);
    }
  }

  const fetchMore = () => {
    setLimit(prev => prev + 6);
  }
  
  useEffect(() => {
    getCategories()
    getProduct(selectedValue, limit)
  }, [])

  useEffect(() => {
    getProduct(selectedValue, limit)
  }, [selectedValue, limit])



  
  return (
    <SafeAreaView style={{ backgroundColor:'black', width: '100%', height:'100%'}}>
      <View style={{marginTop: 10}}><Text style={styles.logo}>Try Commerce</Text></View>
      <View style={styles.filters}>
        <DropDownPicker
          open={open}
          value={selectedValue}
          items={setDropDownValue(categories)}
          setOpen={setOpen}
          setValue={setSelectedValue}
          placeholder="Pilih category..."
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownBox}
          zIndex={1000}
        />
      </View>

      <FlatList
        data={products}
        renderItem={({item}) => renderProducts(item)}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        horizontal={false}
        onEndReachedThreshold={0.2}
        onEndReached={fetchMore}
        ListFooterComponent={()=>(
          products.length > 0 ? (
            <View style={{ padding: 20 }}>
              <ActivityIndicator size="large" />
            </View>
          ) : null
        )}
        ListEmptyComponent={() =>(
          <View style={{  flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 50, height: '100%', margin: 'auto'}}>
            <Text style={{ fontSize: 24, color: 'white' }}>Produk belum tersedia.</Text>
          </View>
        )}      
      />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ padding: 20 }}>
          <Button title="" onPress={() => setShowModal(true)} />
          <ProductModal
            visible={showModal}
            onClose={() => setShowModal(false)}
            product={selectedProduct}
          />
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  wrapper: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  card: {
    display: 'flex',
    flex: 1/2,
    padding: 2,
    alignItems: 'center',
    borderRadius: 10,
    margin: 10,
    backgroundColor: 'white',
    shadowColor: 'black',
    borderColor: 'grey',
    borderWidth: 1,
    width: 150,
    height: 220,
  },
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  result: {
    marginTop: 16,
    fontSize: 16,
    color: '#555',
  },
  statusbar: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  logo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    paddingLeft: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  filters: {
    zIndex: 1000,
    margin: 10,
  },
  dropdown: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    height: 44,
  },
  dropdownBox: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
  },
});
