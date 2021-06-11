import React, {createContext, ReactNode, useContext, useState , useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthProps {
  children: ReactNode;
}

interface LoginData {
  id: string;
  title: string;
  email: string;
  password: string;
}

interface IAuthConextData {
  listLogin: LoginData[];
  getLogins(): Promise<LoginData[]>;
  setLogin(data:LoginData ): Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext({} as IAuthConextData);

function AuthProvider({children}: AuthProps) {
  const [listLogin, setListLogin] = useState<LoginData[]>([]);
  const [isLoading, setisLoading ] = useState(true);
  const dataKey = "@passmanager:logins";

  useEffect(() => {
    async function load() {
      const response = await AsyncStorage.getItem(dataKey);
      const transactions= response ? JSON.parse(response) : [];

      if (transactions){
        setListLogin(transactions);
      }
      setisLoading(false)
    }
    load()

  }, []);

    async function getLogins() {
      let transactions:LoginData[]
      try {
        const response = await AsyncStorage.getItem(dataKey);
        transactions  = response ? JSON.parse(response) : [];
         if (transactions){
          setListLogin(transactions);
        }
        setisLoading(false)
      } catch (error) {
        throw new Error(error);
      }
      return transactions
  }

  async function setLogin(dataNew:LoginData ) {
    try {
      const logins = await getLogins()
      const Data = [
        ...logins,
        dataNew
      ]
      await AsyncStorage.setItem(dataKey , JSON.stringify(Data))
      setListLogin(Data);
    } catch (error) {
      throw new Error(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        listLogin,
        getLogins,
        setLogin,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useLogins() {
  const context = useContext(AuthContext);
  return context;
}

export {AuthProvider, useLogins};
