import { View } from 'react-native';
import Skeleton from 'react-native-reanimated-skeleton';
import { colors } from '../../../shared/theme/colors';
import { spacingX } from '../../../shared/theme/spacing';
import { radius } from '../../../shared/theme/radius';
const CourseCardSkeletonLoading = () => {
    return (

        <Skeleton
            isLoading={true}
            containerStyle={{

                flexDirection: 'row',
                gap: spacingX._12,
                backgroundColor: colors.white,
                borderRadius: radius._16,
                padding: spacingX._12,
                marginVertical: spacingX._8,
                marginHorizontal: spacingX._16,
                shadowColor: '#0F172A',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.05,
                shadowRadius: 10,
                elevation: 2,
            }}
            layout={[
                // Image
                { width: 100, height: 100 },
                // Text rows
                {
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    gap: 6,
                    children: [
                        { width: 150, height: 16 },
                        { width: 100, height: 12 },
                        { width: 80, height: 12 },
                        { width: 150, height: 12 },
                    ],
                },
            ]}
        />

    );
};

export default CourseCardSkeletonLoading;