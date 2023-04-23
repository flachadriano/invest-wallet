import Broker from '../entities/Broker';
import apiPrivate from './ApiPrivate';

interface Payload {
  name: string;
  legalName: string;
  cnpj: string;
}

export async function getBrokerList(): Promise<Broker[]> {
  const { data } = await apiPrivate().get('/brokers');
  return data;
}

export async function getBroker(id: number): Promise<Broker> {
  const { data } = await apiPrivate().get(`/brokers/${id}`);
  return data;
}

export async function postBroker(payload: Payload): Promise<Broker> {
  const { data } = await apiPrivate().post('/brokers', payload);
  return data;
}

export async function putBroker(id: number, payload: Payload): Promise<Broker> {
  const { data } = await apiPrivate().put(`/brokers/${id}`, payload);
  return data;
}

export async function deleteBroker(id: number): Promise<boolean> {
  const { data } = await apiPrivate().delete(`/brokers/${id}`);
  return data;
}
