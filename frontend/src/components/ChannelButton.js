import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import { useTranslation } from 'react-i18next';
import { openModal } from '../slices/modalSlice';
import { setCurrentChannelId } from '../slices/channelsSlice';

const ChannelButton = (props) => {
  const { channel } = props;
  const dispatch = useDispatch();
  const channelsInfo = useSelector((state) => state.channelsInfo);
  const { t } = useTranslation();

  // non-removable case

  if (channel.removable === false) {
    return (
      <li key={channel.id} className="nav-item w-100">
        <Button
          type="button"
          onClick={() => dispatch(setCurrentChannelId({ currentChannelId: channel.id }))}
          variant={cn({
            'outline-secondary': channel.id === channelsInfo.currentChannelId,
          })}
          className="w-100 rounded-0 text-start"
        >
          <span className="me-1">#</span>
          {channel.name}
        </Button>
      </li>
    );
  }

  // removable case

  return (
    <li key={channel.id} className="nav-item w-100">
      <Dropdown as={ButtonGroup} className="w-100">
        <Button
          type="button"
          onClick={() => dispatch(setCurrentChannelId({ currentChannelId: channel.id }))}
          variant={cn({
            'outline-secondary': channel.id === channelsInfo.currentChannelId,
          })}
          className="w-100 rounded-0 text-start text-truncate"
        >
          <span className="me-1">#</span>
          {channel.name}
        </Button>

        <DropdownToggle
          split
          variant={cn({
            'outline-secondary': channel.id === channelsInfo.currentChannelId,
          })}
        >
          <span className="visually-hidden">{t('dropdown.label')}</span>
        </DropdownToggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => dispatch(openModal({ type: 'removing', id: channel.id }))}
          >
            {t('dropdown.delete')}
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => dispatch(openModal({ type: 'renaming', id: channel.id }))}
          >
            {t('dropdown.rename')}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </li>
  );
};

export default ChannelButton;
