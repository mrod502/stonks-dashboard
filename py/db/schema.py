from typing import Union
from enum import Enum


class Schema:
    def __init__(self, fields: dict):
        self.fields = fields
        pass

    def serialize(self, encoding: str = "msgpack") -> Union(str, bytes):
        if encoding == "msgpack":
            return ""
        if encoding == "json":
            return ""

        return ""
