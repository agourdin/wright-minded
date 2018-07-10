from .base import FunctionalTest
from selenium.webdriver.common.keys import Keys


class LayoutAndStylingTest(FunctionalTest):

    def test_layout_and_styling(self):
        # Edith goes to the tools page
        self.browser.get('http://localhost:3000/resources/diagnostic-tools') #self.live_server_url
        self.browser.set_window_size(1920,1080)

        # She is invited to start analyzing her results

        # There is a selection box where she can choose which test to
        # analyze
        test_select = self.browser.find_element_by_id('test_select')

        # # She notices the input box is nicely centered
        # inputbox = self.browser.find_element_by_id('id_new_item')
        # self.assertAlmostEqual(
        #     inputbox.location['x'] + inputbox.size['width'] / 2,
        #     512,
        #     delta=10
        # )
        #
        # # She starts a new list and sees the input is nicely centered
        # # there too
        # inputbox.send_keys('testing')
        # inputbox.send_keys(Keys.ENTER)
        # self.wait_for_row_in_list_table('1: testing')
        # inputbox = self.browser.find_element_by_id('id_new_item')
        # self.assertAlmostEqual(
        #     inputbox.location['x'] + inputbox.size['width'] / 2,
        #     512,
        #     delta=10
        # )
