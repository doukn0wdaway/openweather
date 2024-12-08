import { Modal } from 'antd';
import { useTypedDispatch } from '../../../../hooks/useTypedReduxHooks';
import { removeAllCities } from '../../../../store/weatherSlice';

const { confirm } = Modal;
export const useConfirmAllCitiesDeletion = () => {
  const dispatch = useTypedDispatch();

  const confirmDeletion = () =>
    confirm({
      title: 'Do you want to delete all cities?',
      icon: null,
      cancelButtonProps: { variant: 'solid', color: 'default' },
      okButtonProps: {
        variant: 'solid',
        color: 'danger',
      },
      onOk() {
        dispatch(removeAllCities());
      },
      maskClosable: true,
    });

  return confirmDeletion;
};
