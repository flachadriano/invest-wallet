import Broker from '../entities/Broker';
import api from './Api';

interface Payload {
  acronym: string;
  name: string;
  cnpj: string;
}

export async function getBrokerList(): Promise<Broker[]> {
  const { data } = await api.get('/brokers');
  return data;
}

export async function getBroker(id: number): Promise<Broker> {
  const { data } = await api.get(`/brokers/${id}`);
  return data;
}

export async function postBroker(payload: Payload): Promise<Broker> {
  const { data } = await api.post('/brokers', payload);
  return data;
}

export async function putBroker(id: number, payload: Payload): Promise<Broker> {
  const { data } = await api.put(`/brokers/${id}`, payload);
  return data;
}

export async function deleteBroker(id: number): Promise<boolean> {
  const { data } = await api.delete(`/brokers/${id}`);
  return data;
}
