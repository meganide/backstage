/*
 * Copyright 2023 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import RestoreIcon from '@material-ui/icons/Restore';
import { useTranslationRef } from '@backstage/frontend-plugin-api';
import { homeTranslationRef } from '../../translation';
import {
  Button,
  Menu,
  MenuTrigger,
  MenuItem,
  MenuSeparator,
} from '@backstage/ui';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    widgetWrapper: {
      '& > *:first-child': {
        width: '100%',
        height: '100%',
      },
    },
    buttonGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(1),
    },
  }),
);

type CustomHomepageButtonsProps = {
  editMode: boolean;
  numWidgets: number;
  clearLayout: () => void;
  setAddWidgetDialogOpen: (open: boolean) => void;
  changeEditMode: (mode: boolean) => void;
  defaultConfigAvailable: boolean;
  restoreDefault: () => void;
};
export const CustomHomepageButtons = (props: CustomHomepageButtonsProps) => {
  const {
    editMode,
    numWidgets,
    clearLayout,
    setAddWidgetDialogOpen,
    changeEditMode,
    defaultConfigAvailable,
    restoreDefault,
  } = props;
  const styles = useStyles();
  const { t } = useTranslationRef(homeTranslationRef);

  return (
    <>
      {!editMode && numWidgets > 0 ? (
        <Button variant="primary" onPress={() => changeEditMode(true)}>
          {t('customHomepageButtons.customize')}
        </Button>
      ) : (
        <nav className={styles.buttonGroup}>
          <Button variant="primary" onPress={() => changeEditMode(false)}>
            {t('customHomepageButtons.save')}
          </Button>
          <MenuTrigger>
            <Button variant="secondary" iconEnd={<ArrowDropDownIcon />}>
              {t('customHomepageButtons.actions')}
            </Button>
            <Menu>
              <MenuItem
                id="add-widget"
                onAction={() => setAddWidgetDialogOpen(true)}
                iconStart={<AddIcon />}
              >
                {t('customHomepageButtons.addWidget')}
              </MenuItem>
              {defaultConfigAvailable && (
                <MenuItem
                  id="restore-default"
                  onAction={restoreDefault}
                  iconStart={<RestoreIcon />}
                >
                  {t('customHomepageButtons.restoreDefaults')}
                </MenuItem>
              )}
              {numWidgets > 0 && (
                <>
                  <MenuSeparator />
                  <MenuItem
                    id="clear-all"
                    onAction={clearLayout}
                    iconStart={<DeleteIcon />}
                    color="danger"
                  >
                    {t('customHomepageButtons.clearAll')}
                  </MenuItem>
                </>
              )}
              <MenuSeparator />
              <MenuItem
                id="cancel"
                onAction={() => changeEditMode(false)}
                iconStart={<CloseIcon />}
              >
                {t('customHomepageButtons.cancel')}
              </MenuItem>
            </Menu>
          </MenuTrigger>
        </nav>
      )}
    </>
  );
};
