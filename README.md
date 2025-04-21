# CNAPS

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

[English](./README.md) | [中文](./README.zh-CN.md)

**A tool for crawling and maintaining China's CNAPS (China National Advanced Payment System) codes dataset.**

## Introduction

CNAPS (China National Advanced Payment System) is China's large-value payment system that handles interbank transfers. This project provides a crawler tool to obtain the latest CNAPS codes for Chinese financial institutions, along with a regularly updated dataset.

Financial applications often require valid bank identification codes for transaction processing. CNAPS codes change over time as banks merge, close, or new ones emerge. This project aims to provide an up-to-date, easily accessible dataset of CNAPS codes for developers working with Chinese financial systems.

## Motivation

Online resources for querying CNAPS codes, such as [联行号查询](https://www.lianhanghao.com/), [联行号查询API接口](https://www.cwjyz.com.cn/bank/api_intro.html), and [浙商银行联行号查询](https://corbank.czbank.com/CORPORBANK/query_unionBank_index.jsp), often require following public accounts, logging in for paid access, or have frequent CAPTCHA restrictions, making them inconvenient to use.

Faced with these issues, this project was created to provide a solution without the need for login, CAPTCHA, or other restrictions. The data is synchronized daily to ensure timeliness.

## Features

- Automated crawler for obtaining the latest CNAPS codes
- Regularly updated dataset in both JSON and CSV formats
- Comprehensive coverage of Chinese financial institutions

## Dataset

The dataset is stored in two formats:
- [assets/cnaps.json](packages/core/assets/cnaps.json) - JSON format for programmatic access
- [assets/cnaps.csv](packages/core/assets/cnaps.csv) - CSV format for easy viewing and spreadsheet import

> **Note**:
> CNAPS codes are 12-digit numbers used to uniquely identify banks and branches in China, similar to how SWIFT codes function internationally.

## Usage

You can directly access the dataset files in this repository, or use the crawler tool to obtain the latest data.

or using from https://huggingface.co/datasets/gweesin/CNAPS

## License

[MIT](./LICENSE) License © 2023-PRESENT [Gweesin](https://github.com/gweesin)
