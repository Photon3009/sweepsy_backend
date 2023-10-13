import time
import os
from selenium import webdriver
from selenium.webdriver.common.by import By
import sys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

url = "https://kingsumo.com/"


def run_selenium(email):
    driver = webdriver.Chrome()
    driver.get(url)

    ele = driver.find_element(
        By.XPATH, "//input[@class='form-control text-warning mb-2 mb-md-0']"
    )
    ele.send_keys(email)

    button = driver.find_element(
        By.XPATH, "//button[@class='btn btn-warning btn-arrow pr-4']"
    )
    try:
        time.sleep(2)
        button.click()
        time.sleep(2)
        driver.quit()
        print("Success for " + email)
    except:
        print("Issue is ending data!")


if __name__ == "__main__":
    if len(sys.argv) < 1:
        print("Usage: python your_script.py email1 email2 ...")
    else:
        run_selenium(sys.argv[1])
