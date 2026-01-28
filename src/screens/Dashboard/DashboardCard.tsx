import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  title: string;
  subtitle?: string;
  icon: string;
  onPress: () => void;
}

const DashboardCard: React.FC<Props> = ({
  title,
  subtitle,
  icon,
  onPress,
}) => {
  const theme = useTheme();

  return (
    <Pressable onPress={onPress} style={{ flex: 1 }}>
      {({ pressed }) => (
        <Card
          mode="elevated"
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.surface,
              opacity: pressed ? 0.92 : 1,
            },
          ]}
        >
          <View style={styles.content}>
            <View
              style={[
                styles.iconWrap,
                { backgroundColor: theme.colors.primaryContainer },
              ]}
            >
              <Icon
                name={icon}
                size={26}
                color={theme.colors.primary}
              />
            </View>

            <Text variant="titleMedium" style={styles.title}>
              {title}
            </Text>

            {subtitle && (
              <Text
                variant="bodySmall"
                style={{ color: theme.colors.onSurfaceVariant }}
              >
                {subtitle}
              </Text>
            )}
          </View>
        </Card>
      )}
    </Pressable>
  );
};

export default DashboardCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 16,
  },
  content: {
    alignItems: 'center',
    gap: 10,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: '600',
    textAlign: 'center',
  },
});
