# CNAPS (中国现代化支付系统)

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

[English](./README.md) | [中文](./README.zh-CN.md)

**一个用于爬取并维护中国现代化支付系统(CNAPS)代码数据集的工具。**

## 简介

CNAPS (China National Advanced Payment System，中国现代化支付系统) 是中国的大额支付系统，用于处理银行间转账。本项目提供了一个爬虫工具，用于获取中国金融机构的最新CNAPS代码，并维护一个定期更新的数据集。

金融应用程序通常需要有效的银行标识代码来处理交易。随着银行的合并、关闭或新设立，CNAPS代码会随时间变化。本项目旨在为开发人员提供一个最新的、易于访问的CNAPS代码数据集，方便在中国金融系统中使用。

## 项目动机

在线的联行号查询页面如 [联行号查询](https://www.lianhanghao.com/)、[联行号查询API接口](https://www.cwjyz.com.cn/bank/api_intro.html)、[浙商银行联行号查询](https://corbank.czbank.com/CORPORBANK/query_unionBank_index.jsp)等，要么需要关注公众号，要么需要登录付费使用，要么有频繁的验证码限制，导致使用不便。

苦于以上烦恼，于是有了这个项目，不需要登录、验证码等限制，本项目数据每日同步，保证时效性。

## 功能特点

- 自动化爬虫获取最新的CNAPS代码
- 定期更新的JSON和CSV格式数据集
- 全面覆盖中国金融机构

## 数据集

数据集以两种格式存储：
- [assets/cnaps.json](packages/core/assets/cnaps.json) - JSON格式，便于程序访问
- [assets/cnaps.csv](packages/core/assets/cnaps.csv) - CSV格式，便于查看和导入电子表格

> **注意**：
> CNAPS代码是12位数字，用于唯一标识中国的银行和分支机构，类似于国际上使用的SWIFT代码。

## 使用方法

您可以直接访问本仓库中的数据集文件，或使用爬虫工具获取最新数据。

或者通过 huggingface 使用 https://huggingface.co/datasets/gweesin/CNAPS

## 许可证

[MIT](./LICENSE) License © 2023-PRESENT [Gweesin](https://github.com/gweesin)
