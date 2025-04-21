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

## 项目动机

金融应用程序通常需要有效的银行标识代码来处理交易。随着银行的合并、关闭或新设立，CNAPS代码会随时间变化。本项目旨在为开发人员提供一个最新的、易于访问的CNAPS代码数据集，方便在中国金融系统中使用。

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
