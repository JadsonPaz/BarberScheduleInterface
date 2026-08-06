import React from 'react';
import { Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { styles } from './styles';

export type ServiceRankingItem = {
  id: string;
  name: string;
  count: number;
  revenue: string;
};

type ServiceRankingListProps = {
  items: ServiceRankingItem[];
};

export function ServiceRankingList({ items }: ServiceRankingListProps) {
  return (
    <View style={styles.rankingSection}>
      <Text style={styles.sectionTitle}>Servicos mais usados</Text>

      {items.length === 0 ? (
        <View style={styles.emptyRankingBox}>
          <MaterialCommunityIcons name="chart-box-outline" size={34} color="#2F6B5F" />
          <Text style={styles.emptyTitle}>Nenhum servico concluido</Text>
          <Text style={styles.emptyText}>Os servicos finalizados do mes aparecerao aqui.</Text>
        </View>
      ) : (
        <View style={styles.rankingList}>
          {items.map((item, index) => (
            <View key={item.id} style={styles.rankingItem}>
              <View style={styles.rankBadge}>
                <Text style={styles.rankText}>{index + 1}</Text>
              </View>

              <View style={styles.serviceTextGroup}>
                <Text style={styles.serviceName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.serviceMeta}>
                  {item.count} {item.count === 1 ? 'venda' : 'vendas'}
                </Text>
              </View>

              <Text style={styles.serviceRevenue}>{item.revenue}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
